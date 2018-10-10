export const getRedirectPath = ({ type, avatar }) => {
  // 根据type返回路由路径
  // 判断是否有头像，来返回完善信息的路由路径
  let url = type === "jobSeeker" ? "/jobSeeker" : "/enterprise";
  if(url){
    url += 'info'  // /jobSeekerinfo
  }
  return url;
};
