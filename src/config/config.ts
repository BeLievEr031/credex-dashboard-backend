interface IConfig {
    PORT: number;
    NODE_ENV: string;
}

const Config = {

    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",

} as Readonly<IConfig>

export default Object.freeze(Config);