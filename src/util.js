export const getRedirectPath = ({ type, avatar }) => {
  // 根据type返回路由路径
  // 判断是否有头像，没有头像前往资料完善也main
  let url = type === "jobSeeker" ? "/jobSeeker" : "/enterprise";
  if (!avatar) {
    url += "info"; // /jobSeekerinfo
  }
  return url;
};

// 获取图片后缀 .png .jpg .gif
export const fileSuffix = name => name.replace(/\w.+(?=\.)/g, "");

export const getChatId = (userId, targetId) =>
  [userId, targetId].sort().join("_");
