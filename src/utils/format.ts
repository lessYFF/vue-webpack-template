/**
 * @type 格式类实现
 */

class Format {
    options:String;
    protected constructor(options:any) {
        this.options = options;
    }

    /**
     * 小数格式化
     * @param {Number} num 数值
     * @param {Number} len 保留小数点后几位
     */
    formatFloat(num:Number, len = 2):any {
        return (num ? num.toFixed(len) : 0);
    }

    /**
     * 大数格式化
     * @param {Number} num 数值
     * @param {Number} max 超过多少显示**+
     */
    formatNumber(num:Number, max = 99):any {
        return (num > max ? `${max}+` : num);
    }

    /**
     * 将 Date 转化为指定格式的String 月(M)、日(D)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(Q)
     * 默认，不传fmt日期模板时返回:小时:分钟:秒
     * @param {Number} date 日期
     * @param {String} fmt 格式化模板
     */
    formatDate(date:Date, fmt = 'HH:mm:ss'):any {
        // 判断date类型，转换为标准的Date格式
        if (!(date instanceof Date)) {
            date = new Date();
        }
        const o:any = {
            'M+': date.getMonth() + 1,  // 月份
            'D+': date.getDate(),       // 日
            'Q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'h+': (date.getHours() % 12 === 0) ? 12 : date.getHours() % 12, // 小时
            'H+': date.getHours(),      // 小时
            'm+': date.getMinutes(),    // 分
            's+': date.getSeconds(),    // 秒
            'S': date.getMilliseconds() // 毫秒
        }
        const week:any = {
            '0': '/u65e5', // 日
            '1': '/u4e00', // 一
            '2': '/u4e8c', // 二
            '3': '/u4e09', // 三
            '4': '/u56db', // 四
            '5': '/u4e94', // 五
            '6': '/u516d'  // 六
        }
        // 匹配年份
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        // 匹配周
        if (/(E+)/.test(fmt)) {
            const length = RegExp.$1.length
            const eString = length > 2 ? '/u661f/u671f' : '/u5468'
            fmt = fmt.replace(RegExp.$1, (length > 1 ? eString : '') + week[date.getDay() + ''])
        }
        // 匹配日期，但匹配到一个时，返回对应的值，匹配超过一个返回1位数前缀加0，2位数保持不变
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return fmt
    }
}

export default Format;