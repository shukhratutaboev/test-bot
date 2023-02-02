<script setup>
import validate from "@/utils/validate";
import TermDialog from "./modules/TermDialog.vue";

const {
  onValidationError,
  useQuasar,
  phonePrefix,
  trimBetween,
  ACCEPT_IMAGE_TYPES,
} = useUtils();

const $q = useQuasar();

const maxFileSize = 3 * 1024 * 1000;
const productsStore = useProduct();
const ordersStore = useOrders();

const route = useRoute();
const regionsStore = useRegions();
const { t } = useI18n();
const product = ref({});
let productId = route.params.id;
let organizationId = null;

onMounted(getProductById);

const formRef = ref(null);

const formDefault = {
  phone: null,
  fullname: null,
  isInstallment: false,
  installmentPeriod: null,
  address: null,
  regionId: null,
  comment: null,
  productId: null,
  organizationId: null,
  buildDetails: {},
  wiringDetails: {},
};
const termDialogRef = ref(null);
const form = ref({ ...formDefault });
async function getProductById() {
  $q.loading.show();
  const res = await productsStore.getById(productId);
  console.log("resproduct", res);
  $q.loading.hide();
  if (!res) return;
  product.value = res?.item;
  organizationId = res.organizationId;
}

const formDefaultFiles = [
  { image: "" },
  { image: "" },
  { image: "" },
  { image: "" },
  { image: "" },
];
const formFiles = ref([...formDefaultFiles]);

const phoneRules = computed(() => {
  const phoneLengthFn = (val) =>
    trimBetween(val)?.toString()?.length === 9 ||
    t("enter_the_correct_phone_number");

  return [validate.required, phoneLengthFn];
});

async function openTermDialog() {
  const hasError = !(await formRef.value.validate());
  if (hasError) return;
  termDialogRef.value.open();
}
async function tryToSend() {
  $q.loading.show();
  const data = {
    ...form.value,
    phone: trimBetween(form.value.phone),
    productId,
    organizationId,
  };
  const res = await ordersStore.create(data);
  if (res?.id) {
    await addOrderImages(res.id).catch((e) => false);
    form.value = { ...formDefault };
  }
  $q.loading.hide();
  if (!res?.id) return;
  termDialogRef.value.close();
  $q.notify({
    progress: true,
    position: "top",
    message: t("Thank_you_your_application_has_been_accepted"),
    type: "positive",
    color: "primary",
    timeout: 4000,
  });
  formFiles.value = { ...formDefaultFiles };
}

async function addOrderImages(id) {
  let hasFile = false;
  let formData = new FormData();
  formFiles.value.forEach((el) => {
    if (el.image) {
      formData.append("files", el.image);
      hasFile = true;
    }
  });
  if (!hasFile) return false;
  return ordersStore.updateFiles({ id, files: formData });
}

let resetTimeout = 0;
function resetValidation(timeout = 0) {
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    formRef.value.resetValidation();
  }, timeout);
}

function onRejected(error) {
  if (error?.[0].failedPropValidation === "max-file-size") {
    $q.notify({
      progress: true,
      position: "top",
      message: t("file_size_exceeds_mb", { s: maxFileSize / 1024 / 1000 }),
      type: "negative",
      timeout: 2000,
    });
  }
  if (error?.[0].failedPropValidation === "duplicate") {
    $q.notify({
      progress: true,
      position: "top",
      message: t("such_file_already_exists"),
      // message: t("maximum_number_of_files", { n: 3 }),
      type: "negative",
      timeout: 2000,
    });
  }
}
</script>
<template>
  <div class="order_page">
    <div class="container">
      <!-- <div class="breadcrumbs">
        Главная > Каталог > Солнечные электростанции > на 2 кВт > Комплект
        однофазный, 2 кВт, Solax – Jinko Solar > Оформление заявки
      </div> -->
    </div>
    <div class="container grid">
      <div class="content">
        <header class="header">
          <div class="title">{{ t("Registration_of_the_application") }}</div>
        </header>
        <q-form ref="formRef" @validation-error="onValidationError">
          <div class="form_title">
            {{ t("General_information") }}
          </div>
          <div class="form_row">
            <div class="col required">
              <div class="label">
                {{ t("Telephone_number") }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.phone"
                outlined
                type="tel"
                mask="## ### ## ##"
                :placeholder="t('Enter_phone_number')"
                :rules="phoneRules"
                prepend
                @update:model-value="resetValidation"
              >
                <template #prepend>
                  <div class="phone_prefix">
                    {{ phonePrefix }}
                  </div>
                </template>
              </BaseInput>
            </div>
            <div class="col required">
              <div class="label">
                {{ t("FULL_NAME_short") }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.fullname"
                outlined
                :placeholder="t('Enter_your_name')"
                :rules="[validate.required, validate.tag]"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col required full_width">
              <div class="label">
                {{ t("Deal_type") }}<span class="badge">*</span>
              </div>
              <q-radio
                v-model="form.isInstallment"
                :val="false"
                :label="t('Buy_with_compensation')"
              />
              <q-radio
                v-if="!product.compensationOnly"
                v-model="form.isInstallment"
                :val="true"
                :label="t('Buy_in_installments')"
              />
              <div v-if="product.compensationOnly" class="mt-1 text-grey-7">
                {{ t("Installments_are_not_available") }}
              </div>
            </div>
            <div class="col required">
              <div class="label">
                {{ t("Installation_address") }}<span class="badge">*</span>
              </div>
              <BaseSelectByUrl
                v-model="form.regionId"
                required
                outlined
                :placeholder="t('Choose_region')"
                :cb-func="regionsStore.fetchRegions"
                :rules="[validate.required]"
                option-value="id"
                option-label="name"
                emit-value
                map-options
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col required">
              <div class="label">&nbsp;</div>
              <BaseInput
                v-model="form.address"
                outlined
                :placeholder="t('Enter_address')"
                :rules="[validate.required, validate.tag]"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col required full_width">
              <div class="label">
                {{ t("Comments") }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.comment"
                outlined
                type="textarea"
                :placeholder="t('Add_comment')"
                :rules="[validate.required, validate.tag]"
                @update:model-value="resetValidation"
              />
            </div>
          </div>
          <div class="form_title">
            {{ t("General_information_about_the_installation_site") }}
          </div>
          <div class="form_row">
            <div class="col">
              <div class="label">
                {{ t("Building_type") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Choose_building_type"
                outlined
                :options="[
                  { id: 'house', label: t('house') },
                  { id: 'country_house', label: t('country_house') },
                  {
                    id: 'commercial_premises',
                    label: t('commercial_premises'),
                  },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Choose_building_type')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Load_bearing_wall_material")
                }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Choose_a_load_bearing_wall_material"
                outlined
                :options="[
                  { id: 'burnt_brick', label: t('burnt_brick') },
                  { id: 'cinder_block', label: t('cinder_block') },
                  { id: 'raw_brick', label: t('raw_brick') },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Choose_a_load_bearing_wall_material')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Roof_type") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Choose_roof_type"
                outlined
                :options="[
                  { id: 'decking_roof', label: t('decking_roof') },
                  { id: 'roof_tiles', label: t('roof_tiles') },
                  {
                    id: 'asbestos_sheets_slate',
                    label: t('asbestos_sheets_slate'),
                  },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Choose_roof_type')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Overlap_type") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Choose_type_of_precrimination"
                outlined
                :options="[
                  {
                    id: 'reinforced_concrete_slabs',
                    label: t('reinforced_concrete_slabs'),
                  },
                  { id: 'wooden_log_cabins', label: t('wooden_log_cabins') },
                  { id: 'metal_trusses', label: t('metal_trusses') },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Choose_type_of_precrimination')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Roof_type2") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Choose_roof_type2"
                outlined
                :options="[
                  { id: 'flat_roof', label: t('flat_roof') },
                  { id: 'oblique', label: t('oblique') },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Choose_roof_type2')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Installation_location") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.buildDetails.Select_installation_location"
                outlined
                :options="[
                  { id: 'on_the_roof', label: t('on_the_roof') },
                  { id: 'on_the_ground', label: t('on_the_ground') },
                  { id: 'other', label: t('other') },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Select_installation_location')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Usable_to_install") }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.buildDetails.Enter_usable_roof_area_sqm"
                outlined
                :placeholder="t('Enter_usable_roof_area_sqm')"
                :rules="[validate.tag, validate.number, validate.positive]"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Room_area") }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.buildDetails.Area_in_sqm"
                outlined
                :rules="[validate.tag, validate.number, validate.positive]"
                :placeholder="t('Area_in_sqm')"
                @update:model-value="resetValidation"
              />
            </div>
          </div>
          <div class="form_title">
            {{ t("Power_grid_information") }}
          </div>
          <div class="form_row">
            <div class="col">
              <div class="label">
                {{ t("Distance_from_the_installation_site_to_the_meter")
                }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.wiringDetails.Enter_the_distance_to_the_counter"
                outlined
                :options="[
                  { id: 'up_to_num_m', label: t('up_to_num_m', { n: 5 }) },
                  {
                    id: 'from_num_to_num1_m',
                    label: t('from_num_to_num1_m', { n: 5, n1: 10 }),
                  },
                  { id: 'over_num_m', label: t('over_num_m', { n: 10 }) },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Enter_the_distance_to_the_counter')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Service_life_of_electrical_wiring")
                }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.wiringDetails.Select_the_lifetime_of_the_wiring"
                outlined
                :options="[
                  {
                    id: 'up_to_num_years',
                    label: t('up_to_num_years', { n: 5 }),
                  },
                  {
                    id: 'num_to_num1_years',
                    label: t('num_to_num1_years', { n: 5, n1: 10 }),
                  },
                  {
                    id: 'over_num_years',
                    label: t('over_num_years', { n: 10 }),
                  },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Select_the_lifetime_of_the_wiring')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Cross_section_of_electrical_wires")
                }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.wiringDetails.Select_wire_size"
                outlined
                :options="[
                  { id: 'num_mm', label: t('num_mm', { n: 2 }) },
                  { id: 'str_mm', label: t('str_mm', { s: '2-5' }) },
                  { id: 'str_mm_l', label: t('str_mm_l', { s: '5-10' }) },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Select_wire_size')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Wiring_material") }}<span class="badge">*</span>
              </div>
              <BaseSelect
                v-model="form.wiringDetails.Select_wiring_material"
                outlined
                :options="[
                  { id: 'copper', label: t('copper') },
                  { id: 'aluminum', label: t('aluminum') },
                  {
                    id: 'copper_and_aluminum',
                    label: t('copper_and_aluminum'),
                  },
                ]"
                map-options
                emit-value
                option-value="id"
                option-label="label"
                :placeholder="t('Select_wiring_material')"
                @update:model-value="resetValidation"
              />
            </div>
            <div class="col">
              <div class="label">
                {{ t("Distance_to_the_nearest_power_tower")
                }}<span class="badge">*</span>
              </div>
              <BaseInput
                v-model="form.wiringDetails.Distance_in_m"
                outlined
                :rules="[validate.tag, validate.number, validate.positive]"
                :placeholder="t('Distance_in_m')"
                @update:model-value="resetValidation"
              />
            </div>
          </div>
          <div class="form_title">
            {{ t("Additional_Information") }}
          </div>
          <div class="form_row">
            <div class="col full_width">
              <div class="label">
                {{ t("Add_a_photo_of_the_installation_site")
                }}<span class="badge">*</span>
              </div>
              <div class="images">
                <BaseImageUpload
                  v-for="(item, index) in formFiles"
                  v-model="item.image"
                  :key="index"
                  :max-file-size="maxFileSize"
                  :show-title="false"
                  @file-rejected="onRejected"
                  :accept="ACCEPT_IMAGE_TYPES"
                />
              </div>
            </div>
          </div>
        </q-form>
        <footer class="footer">
          <q-btn
            :label="t('send')"
            color="primary"
            no-caps
            class="px-5"
            @click="openTermDialog"
          />
        </footer>
      </div>
      <div class="right_sider">
        <PartialsProductCard :product="product" :show-btn="false" />
      </div>
    </div>
    <TermDialog ref="termDialogRef" @send="tryToSend" />
  </div>
</template>

<style lang="scss" scoped>
.order_page {
  margin-bottom: 50px;
  padding-top: 20px;
  .container {
    &.grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }
  }
  .content {
    grid-column: 1 / 4;
    background-color: #fff;
    padding: 24px;
    padding-bottom: 34px;
    border-radius: 6px;
    .header {
      margin-bottom: 34px;
      .title {
        font-weight: 700;
        font-size: 36px;
        line-height: 41px;
        letter-spacing: -0.04em;
      }
    }
    .q-form {
      .form_title {
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: -0.02em;
        margin-bottom: 24px;
        margin-top: 34px;
      }
      .form_row {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, 1fr);
      }
      .col {
        .label {
          font-size: 16px;
          line-height: 18px;
          margin-bottom: 14px;
        }

        .badge {
          visibility: hidden;
          opacity: 0;
        }
        &.required {
          .badge {
            opacity: 1;
            visibility: visible;
            color: $red;
          }
        }
        &.full_width {
          grid-column: 1 / 3;
        }
      }
      .images {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 20px;
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      padding: 20px 0;
    }
  }
}

.mobile {
  .order_page {
    .container {
      &.grid {
        display: block;
      }
    }
    .content {
      padding: 20px;
      padding-bottom: 0;
      margin-bottom: 20px;
      .header {
        margin-bottom: 0;
        .title {
          font-size: 22px;
          line-height: 25px;
        }
      }
      .q-form {
        .form_title {
          font-weight: 700;
          font-size: 16px;
          line-height: 18px;
          margin-bottom: 20px;
          margin-top: 24px;
        }
        .col {
          .label {
            font-size: 14px;
            line-height: 16px;
            margin-bottom: 10px;
          }
        }
        .images {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          .file-upload {
            width: 160px;
            :deep(.image-upload-wrap) {
              height: 160px;
            }
          }
        }
      }
    }
    @media (max-width: 700px) {
      .content {
        padding: 15px;
        margin-bottom: 15px;
        .header {
          .title {
            font-size: 20px;
            line-height: 24px;
          }
        }
        .q-form {
          .form_row {
            display: grid;
            gap: 20px;
            grid-template-columns: 1fr;
          }
          .col {
            &.full_width {
              grid-column: 1;
            }
          }
        }
        .footer {
          padding: 0;
          padding-top: 15px;
        }
      }
    }
  }
}
</style>
