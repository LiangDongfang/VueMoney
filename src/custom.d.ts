type RecordItem = {
  tags: string[];
  type: string;
  notes: string;
  amount: number;
  createAt?: string; //？表示可以不存在
}

type Tag = {
  id: string;
  name: string;
}

type rootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
  save: () => void;
}
