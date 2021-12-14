declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
