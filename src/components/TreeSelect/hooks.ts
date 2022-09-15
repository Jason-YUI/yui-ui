import {useMemo} from 'react';

function useLeafs<T extends any[]>(data: T): T {
  return useMemo(() => {
    const result:any = [];
    const getLeaf = (tree:T) => {
      tree.forEach((t) => {
        if(!t.children?.length) {
          result.push(t);
        }else {
          getLeaf(t.children);
        }
      })
    }
    getLeaf(data);
    return result;
  },[data]);
}

export {useLeafs};
