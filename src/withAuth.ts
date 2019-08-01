export const withAuth = (request: any) => {
  if (!request.user) {
    throw Error("로그인이 필요해요 😥");
  }
  return;
};
