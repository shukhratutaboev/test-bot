interface IListInfo {
  label: string;
  iconName: string;
}
interface ICatalog {
  id: number;
  imgName: string;
  title: string;
  count: number;
  desc: string;
  list: IListInfo[];
  action: {
    label: string;
    to: string;
  };
}

export { IListInfo, ICatalog };
