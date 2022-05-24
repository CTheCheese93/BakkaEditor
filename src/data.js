const datasets = [
    {
        pageId: 0,
        data: [
            {
            id: 0,
            type: 'paragraph',
            children: [{ text: 'A first line of text in a paragraph.'}]
            },
            {
            id: 1,
            type: 'paragraph',
            url: 'http://just.checking/',
            children: [{ text: 'A second line of text in a paragraph.'}]
            },
            {
            id: 2,
            type: 'pagelink',
            url: 'http://google.com/',
            children: [{ text: 'This is a test link'}]
            }
        ]  
    },
    {
        pageId: 1,
        data: [
            {
            id: 0,
            type: 'paragraph',
            children: [{ text: 'This is a second page!!'}]
            }
        ]  
    },
]

export function getPageById(id) {
    return datasets.filter((page) => page.pageId === id)[0];
}