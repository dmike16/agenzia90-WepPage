export default function(content: string, map:any): string {
    const cssString  = JSON.stringify(content);
    const cssMap = map && JSON.stringify(map);

    return `module.exports = [[module.id,${cssString}, " ",${cssMap}]]`;
}
