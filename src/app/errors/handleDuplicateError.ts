const handleDuplicateError = (error: any) => {
  return [
    {
      path: '',
      message: `Duplicate value entered for ${Object.keys(error?.keyValue)[0]}`,
    },
  ];
};

export default handleDuplicateError;
