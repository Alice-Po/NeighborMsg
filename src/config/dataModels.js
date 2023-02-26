const dataModels = {
  Note: {
    types: ['as:Note'],
  },
  Actor: {
    types: ['as:Actor'],
    list: {},
  },
  Profile: {
    types: ['vcard:Individual'],
    list: {},
  },
  Location: {
    types: ['vcard:Location'],
    list: {
      servers: 'pod',
      dereference: ['vcard:hasAddress/vcard:hasGeo'],
    },
  },
};

export default dataModels;
