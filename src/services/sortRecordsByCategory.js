const sortRecordsByCategory = (category, records) => {
  if (!records.length || category.toLowerCase() === 'date') {
    console.log('date');
    return records;
  }

  let sortedArr = [];

  switch (category.toLowerCase()) {
    case 'resource':
      console.log('resource');
      sortedArr = [...records].sort((a, b) =>
        a['resource'].localeCompare(b['resource'])
      );
      break;

    case 'company':
      console.log('company');
      sortedArr = [...records].sort((a, b) =>
        a['company'].localeCompare(b['company'])
      );
      break;
    case 'position':
      sortedArr = [...records].sort((a, b) =>
        a['position'].localeCompare(b['position'])
      );
      break;

    default:
      console.log('default');
      return records;
  }

  return sortedArr;
};

export default sortRecordsByCategory;
