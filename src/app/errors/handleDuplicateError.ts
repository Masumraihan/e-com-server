const handleDuplicateError = (error: any) => {
  return [
    {
      path: '',
      message: `${Object.keys(error?.keyValue)[0]} '${Object.values(error?.keyValue)[0]}' already exists`,
    },
  ];
};

export default handleDuplicateError;
