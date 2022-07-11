export interface ListInt {
  userId: number,
  id: number,
  title: string,
  introduce: string
}

export interface selectDataInt {
  title: string,
  introduce: string,
  page: number,
  count: number,  // 总条数
  pageSize: number
}

export class InitData {
  list: ListInt[] = []
  selectData: selectDataInt = {
    title: '',
    introduce: '',
    page: 1,
    count: 0,
    pageSize: 5
  }
}