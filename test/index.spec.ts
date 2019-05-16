import * as fs from 'fs';
import * as gulp from 'gulp';
import * as path from 'path';
import { parseToHtml } from '../src/index';

gulp.src(['./test/assert/test.js']).pipe(parseToHtml({
    type: 'script',
})).pipe(
    gulp.dest('./test/dist'),
);

describe('test script', () => {
    it('one', () => {
        const orignContent = fs.readFileSync(path.resolve('./test/assert/test.js')).toString();
        const distContent = fs.readFileSync('./test/dist/test.js.html').toString();
        expect(orignContent.trim()).toBe(orignContent.trim());
    });
});