import next from "eslint-config-next";

const config = [{ ignores: ["_next/**", "out/**"] }, ...next];

export default config;
