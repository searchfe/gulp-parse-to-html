import * as gutil from 'gulp-util';
import replaceExt = require('replace-ext');
import * as through from 'through2';

export function parseToHtml(options) {

    const type = options.type;

    return through.obj(function(file, enc, cb) {
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.emit('error', new gutil.PluginError('files can not be empty'));
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('Streaming not supported'));
            return cb();
        }

        if (file.isBuffer()) {
            const content = file.contents.toString();
            file.contents = new Buffer(`<${type}>${content}</${type}>`);
            file.path += '.html';
            this.push(file);
            cb();
        }
    });
}