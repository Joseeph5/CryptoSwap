const reducer = (state, action) => {
  switch (action.type) {
    case 'setAcount':
      return { ...state, account: action.payload };

      break;

    default:
      break;
  }
};

export default reducer;
