const locales = {
  'zh-CN': {
    title: '栅格列表',
    settings: {
      'x-component-props': {
        hasHeader: '表格头',
        hasPagination: '分页',
        paginationPosition: {
          title:"分页位置",
          dataSource: ['左', '右', '居中'],
        },
        pageSize: '每页大小',
      },
    },
  },
  'en-US': {
    title: 'Grid',
    addGridColumn: 'Add Grid Column',
    settings: {
      'x-component-props': {
        minWidth: 'Min Width',
        minColumns: 'Min Columns',
        maxWidth: 'Max Width',
        maxColumns: 'Max Columns',
        breakpoints: 'Breakpoints',
        columnGap: 'Column Gap',
        rowGap: 'Row Gap',
        colWrap: 'Col Wrap',
      },
    },
  },
}

export default locales;