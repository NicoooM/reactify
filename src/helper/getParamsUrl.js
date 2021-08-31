const getParamsUrl = (param) => {
  return new URL(document.location).searchParams.get(param);
};

export default getParamsUrl;
