module.exports = async (context, req) => {
  context.res = {
    status: 200,
    body: 'Hello!',
  };
};
