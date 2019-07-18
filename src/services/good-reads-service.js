function goodReadsService() {
  function getDescriptionById() {
    return new Promise((resolve) => {
      resolve({ description: 'some description' });
    });
  }

  return {
    getDescriptionById,
  };
}

module.exports = goodReadsService();
