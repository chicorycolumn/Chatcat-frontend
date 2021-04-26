exports.setProperties = (newProperties, data, setData) => {
  let dataNew = { ...data };

  Object.keys(newProperties).forEach((k) => {
    let v = newProperties[k];
    dataNew[k] = v;
  });

  setData(dataNew);
};
