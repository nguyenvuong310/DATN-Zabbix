import instance from "../utils/axiosCustomize";

export const login = async (username, password) => {
  return await instance.post("/api/cameras/login", {
    username,
    password,
  });
};

export const createCamera = async (name, ip, dns, port) => {
  const camera = {
    host: name,
    ip: ip,
    dns: dns,
    port: port,
    groups: [
      {
        groupid: "4",
      },
    ],
  };
  return await instance.post("/api/cameras", camera);
};
