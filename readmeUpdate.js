import Parser from 'rss-parser';
import fs from 'fs';

const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }
});

(async () => {
    const feed = await parser.parseURL('https://tistraw0454.tistory.com/rss');
    let text = '<div id="rss-feed">\n';

    for (let i = 0; i < Math.min(feed.items.length, 5); i++) {
        const { title, link } = feed.items[i];
        text += `<a href="${link}">${title}</a><br>\n`;
    }

    text += '</div>';

    let readme = fs.readFileSync('README.md', 'utf8');
    readme = readme.replace(/<div id="rss-feed">([\s\S]*?)<\/div>/, text);

    fs.writeFileSync('README.md', readme, 'utf8');

    console.log('README.md has been updated');
})();

