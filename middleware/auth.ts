export default defineNuxtRouteMiddleware((to, from) => {
  if (to.params.id === "1") {
    return navigateTo("/");
    // return abortNavigation();
  }
  //   return navigateTo("/");
});
