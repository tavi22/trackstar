export const excerpt = (content, length) => {
    if (content.length <= length) return content;

    return content.substr(0, length) + '...';

}