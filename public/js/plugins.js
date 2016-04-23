//! moment.js
//! version : 2.12.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
            (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
            module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                    'an existing locale. moment.defineLocale(localeName, ' +
                    'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                        'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return Object.keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '';
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')$', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')$', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                    a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                        a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                            a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                                    a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                                        -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', false);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
            config._a[HOUR] <= 12 &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? +input : +local__createLocal(input)) - (+res);
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(+res._d + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)W)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
        // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                    diff < 0 ? 'lastDay' :
                        diff < 1 ? 'sameDay' :
                            diff < 2 ? 'nextDay' :
                                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this > +localInput;
        } else {
            return +localInput < +this.clone().startOf(units);
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return +this < +localInput;
        } else {
            return +this.clone().endOf(units) < +localInput;
        }
    }

    function isBetween (from, to, units) {
        return this.isAfter(from, units) && this.isBefore(to, units);
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return +this === +localInput;
        } else {
            inputMs = +localInput;
            return +(this.clone().startOf(units)) <= inputMs && inputMs <= +(this.clone().endOf(units));
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                    units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                        units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                            units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        return -(wholeMonthDiff + adjust);
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        var output = formatMoment(this, inputString || utils_hooks__hooks.defaultFormat);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
            local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
            ((isMoment(time) && time.isValid()) ||
            local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
            /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
            /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
            /* falls through */
            case 'hour':
                this.minutes(0);
            /* falls through */
            case 'minute':
                this.seconds(0);
            /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }
        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return +this._d - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(+this / 1000);
    }

    function toDate () {
        return this._offset ? new Date(+this) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
            input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   matchWord);
    addRegexToken('ddd',  matchWord);
    addRegexToken('dddd', matchWord);

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = local__createLocal([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function list (format, index, field, count, setter) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, setter);
        }

        var i;
        var out = [];
        for (i = 0; i < count; i++) {
            out[i] = lists__get(format, i, field, setter);
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return list(format, index, 'months', 12, 'month');
    }

    function lists__listMonthsShort (format, index) {
        return list(format, index, 'monthsShort', 12, 'month');
    }

    function lists__listWeekdays (format, index) {
        return list(format, index, 'weekdays', 7, 'day');
    }

    function lists__listWeekdaysShort (format, index) {
        return list(format, index, 'weekdaysShort', 7, 'day');
    }

    function lists__listWeekdaysMin (format, index) {
        return list(format, index, 'weekdaysMin', 7, 'day');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                    (b === 1) ? 'st' :
                        (b === 2) ? 'nd' :
                            (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
            (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
            minutes <= 1           && ['m']           ||
            minutes < thresholds.m && ['mm', minutes] ||
            hours   <= 1           && ['h']           ||
            hours   < thresholds.h && ['hh', hours]   ||
            days    <= 1           && ['d']           ||
            days    < thresholds.d && ['dd', days]    ||
            months  <= 1           && ['M']           ||
            months  < thresholds.M && ['MM', months]  ||
            years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.12.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
/*
 The MIT License (MIT)

 Copyright (c) 2015 Jonathan Peterson

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */
/*global define:false */
/*global exports:false */
/*global require:false */
/*global jQuery:false */
/*global moment:false */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'moment'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('moment'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
        }
        if (typeof moment === 'undefined') {
            throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
        }
        factory(jQuery, moment);
    }
}(function ($, moment) {
    'use strict';
    if (!moment) {
        throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
    }

    var dateTimePicker = function (element, options) {
        var picker = {},
            date,
            viewDate,
            unset = true,
            input,
            component = false,
            widget = false,
            use24Hours,
            minViewModeNumber = 0,
            actualFormat,
            parseFormats,
            currentViewMode,
            datePickerModes = [
                {
                    clsName: 'days',
                    navFnc: 'M',
                    navStep: 1
                },
                {
                    clsName: 'months',
                    navFnc: 'y',
                    navStep: 1
                },
                {
                    clsName: 'years',
                    navFnc: 'y',
                    navStep: 10
                },
                {
                    clsName: 'decades',
                    navFnc: 'y',
                    navStep: 100
                }
            ],
            viewModes = ['days', 'months', 'years', 'decades'],
            verticalModes = ['top', 'bottom', 'auto'],
            horizontalModes = ['left', 'right', 'auto'],
            toolbarPlacements = ['default', 'top', 'bottom'],
            keyMap = {
                'up': 38,
                38: 'up',
                'down': 40,
                40: 'down',
                'left': 37,
                37: 'left',
                'right': 39,
                39: 'right',
                'tab': 9,
                9: 'tab',
                'escape': 27,
                27: 'escape',
                'enter': 13,
                13: 'enter',
                'pageUp': 33,
                33: 'pageUp',
                'pageDown': 34,
                34: 'pageDown',
                'shift': 16,
                16: 'shift',
                'control': 17,
                17: 'control',
                'space': 32,
                32: 'space',
                't': 84,
                84: 't',
                'delete': 46,
                46: 'delete'
            },
            keyState = {},

            /********************************************************************************
             *
             * Private functions
             *
             ********************************************************************************/
            getMoment = function (d) {
                var tzEnabled = false,
                    returnMoment,
                    currentZoneOffset,
                    incomingZoneOffset,
                    timeZoneIndicator,
                    dateWithTimeZoneInfo;

                if (moment.tz !== undefined && options.timeZone !== undefined && options.timeZone !== null && options.timeZone !== '') {
                    tzEnabled = true;
                }
                if (d === undefined || d === null) {
                    if (tzEnabled) {
                        returnMoment = moment().tz(options.timeZone).startOf('d');
                    } else {
                        returnMoment = moment().startOf('d');
                    }
                } else {
                    if (tzEnabled) {
                        currentZoneOffset = moment().tz(options.timeZone).utcOffset();
                        incomingZoneOffset = moment(d, parseFormats, options.useStrict).utcOffset();
                        if (incomingZoneOffset !== currentZoneOffset) {
                            timeZoneIndicator = moment().tz(options.timeZone).format('Z');
                            dateWithTimeZoneInfo = moment(d, parseFormats, options.useStrict).format('YYYY-MM-DD[T]HH:mm:ss') + timeZoneIndicator;
                            returnMoment = moment(dateWithTimeZoneInfo, parseFormats, options.useStrict).tz(options.timeZone);
                        } else {
                            returnMoment = moment(d, parseFormats, options.useStrict).tz(options.timeZone);
                        }
                    } else {
                        returnMoment = moment(d, parseFormats, options.useStrict);
                    }
                }
                return returnMoment;
            },
            isEnabled = function (granularity) {
                if (typeof granularity !== 'string' || granularity.length > 1) {
                    throw new TypeError('isEnabled expects a single character string parameter');
                }
                switch (granularity) {
                    case 'y':
                        return actualFormat.indexOf('Y') !== -1;
                    case 'M':
                        return actualFormat.indexOf('M') !== -1;
                    case 'd':
                        return actualFormat.toLowerCase().indexOf('d') !== -1;
                    case 'h':
                    case 'H':
                        return actualFormat.toLowerCase().indexOf('h') !== -1;
                    case 'm':
                        return actualFormat.indexOf('m') !== -1;
                    case 's':
                        return actualFormat.indexOf('s') !== -1;
                    default:
                        return false;
                }
            },
            hasTime = function () {
                return (isEnabled('h') || isEnabled('m') || isEnabled('s'));
            },

            hasDate = function () {
                return (isEnabled('y') || isEnabled('M') || isEnabled('d'));
            },

            getDatePickerTemplate = function () {
                var headTemplate = $('<thead>')
                    .append($('<tr>')
                        .append($('<th>').addClass('prev').attr('data-action', 'previous')
                            .append($('<span>').addClass(options.icons.previous))
                        )
                        .append($('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', (options.calendarWeeks ? '6' : '5')))
                        .append($('<th>').addClass('next').attr('data-action', 'next')
                            .append($('<span>').addClass(options.icons.next))
                        )
                    ),
                    contTemplate = $('<tbody>')
                        .append($('<tr>')
                            .append($('<td>').attr('colspan', (options.calendarWeeks ? '8' : '7')))
                        );

                return [
                    $('<div>').addClass('datepicker-days')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate)
                            .append($('<tbody>'))
                        ),
                    $('<div>').addClass('datepicker-months')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                        ),
                    $('<div>').addClass('datepicker-years')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                        ),
                    $('<div>').addClass('datepicker-decades')
                        .append($('<table>').addClass('table-condensed')
                            .append(headTemplate.clone())
                            .append(contTemplate.clone())
                        )
                ];
            },

            getTimePickerMainTemplate = function () {
                var topRow = $('<tr>'),
                    middleRow = $('<tr>'),
                    bottomRow = $('<tr>');

                if (isEnabled('h')) {
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementHour}).addClass('btn').attr('data-action', 'incrementHours')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-hour').attr({'data-time-component':'hours', 'title': options.tooltips.pickHour}).attr('data-action', 'showHours')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementHour}).addClass('btn').attr('data-action', 'decrementHours')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('m')) {
                    if (isEnabled('h')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementMinute}).addClass('btn').attr('data-action', 'incrementMinutes')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-minute').attr({'data-time-component': 'minutes', 'title': options.tooltips.pickMinute}).attr('data-action', 'showMinutes')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementMinute}).addClass('btn').attr('data-action', 'decrementMinutes')
                            .append($('<span>').addClass(options.icons.down))));
                }
                if (isEnabled('s')) {
                    if (isEnabled('m')) {
                        topRow.append($('<td>').addClass('separator'));
                        middleRow.append($('<td>').addClass('separator').html(':'));
                        bottomRow.append($('<td>').addClass('separator'));
                    }
                    topRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.incrementSecond}).addClass('btn').attr('data-action', 'incrementSeconds')
                            .append($('<span>').addClass(options.icons.up))));
                    middleRow.append($('<td>')
                        .append($('<span>').addClass('timepicker-second').attr({'data-time-component': 'seconds', 'title': options.tooltips.pickSecond}).attr('data-action', 'showSeconds')));
                    bottomRow.append($('<td>')
                        .append($('<a>').attr({href: '#', tabindex: '-1', 'title': options.tooltips.decrementSecond}).addClass('btn').attr('data-action', 'decrementSeconds')
                            .append($('<span>').addClass(options.icons.down))));
                }

                if (!use24Hours) {
                    topRow.append($('<td>').addClass('separator'));
                    middleRow.append($('<td>')
                        .append($('<button>').addClass('btn btn-primary').attr({'data-action': 'togglePeriod', tabindex: '-1', 'title': options.tooltips.togglePeriod})));
                    bottomRow.append($('<td>').addClass('separator'));
                }

                return $('<div>').addClass('timepicker-picker')
                    .append($('<table>').addClass('table-condensed')
                        .append([topRow, middleRow, bottomRow]));
            },

            getTimePickerTemplate = function () {
                var hoursView = $('<div>').addClass('timepicker-hours')
                    .append($('<table>').addClass('table-condensed')),
                    minutesView = $('<div>').addClass('timepicker-minutes')
                        .append($('<table>').addClass('table-condensed')),
                    secondsView = $('<div>').addClass('timepicker-seconds')
                        .append($('<table>').addClass('table-condensed')),
                    ret = [getTimePickerMainTemplate()];

                if (isEnabled('h')) {
                    ret.push(hoursView);
                }
                if (isEnabled('m')) {
                    ret.push(minutesView);
                }
                if (isEnabled('s')) {
                    ret.push(secondsView);
                }

                return ret;
            },

            getToolbar = function () {
                var row = [];
                if (options.showTodayButton) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'today', 'title': options.tooltips.today}).append($('<span>').addClass(options.icons.today))));
                }
                if (!options.sideBySide && hasDate() && hasTime()) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'togglePicker', 'title': options.tooltips.selectTime}).append($('<span>').addClass(options.icons.time))));
                }
                if (options.showClear) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'clear', 'title': options.tooltips.clear}).append($('<span>').addClass(options.icons.clear))));
                }
                if (options.showClose) {
                    row.push($('<td>').append($('<a>').attr({'data-action':'close', 'title': options.tooltips.close}).append($('<span>').addClass(options.icons.close))));
                }
                return $('<table>').addClass('table-condensed').append($('<tbody>').append($('<tr>').append(row)));
            },

            getTemplate = function () {
                var template = $('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'),
                    dateView = $('<div>').addClass('datepicker').append(getDatePickerTemplate()),
                    timeView = $('<div>').addClass('timepicker').append(getTimePickerTemplate()),
                    content = $('<ul>').addClass('list-unstyled'),
                    toolbar = $('<li>').addClass('picker-switch' + (options.collapse ? ' accordion-toggle' : '')).append(getToolbar());

                if (options.inline) {
                    template.removeClass('dropdown-menu');
                }

                if (use24Hours) {
                    template.addClass('usetwentyfour');
                }
                if (isEnabled('s') && !use24Hours) {
                    template.addClass('wider');
                }

                if (options.sideBySide && hasDate() && hasTime()) {
                    template.addClass('timepicker-sbs');
                    if (options.toolbarPlacement === 'top') {
                        template.append(toolbar);
                    }
                    template.append(
                        $('<div>').addClass('row')
                            .append(dateView.addClass('col-md-6'))
                            .append(timeView.addClass('col-md-6'))
                    );
                    if (options.toolbarPlacement === 'bottom') {
                        template.append(toolbar);
                    }
                    return template;
                }

                if (options.toolbarPlacement === 'top') {
                    content.append(toolbar);
                }
                if (hasDate()) {
                    content.append($('<li>').addClass((options.collapse && hasTime() ? 'collapse in' : '')).append(dateView));
                }
                if (options.toolbarPlacement === 'default') {
                    content.append(toolbar);
                }
                if (hasTime()) {
                    content.append($('<li>').addClass((options.collapse && hasDate() ? 'collapse' : '')).append(timeView));
                }
                if (options.toolbarPlacement === 'bottom') {
                    content.append(toolbar);
                }
                return template.append(content);
            },

            dataToOptions = function () {
                var eData,
                    dataOptions = {};

                if (element.is('input') || options.inline) {
                    eData = element.data();
                } else {
                    eData = element.find('input').data();
                }

                if (eData.dateOptions && eData.dateOptions instanceof Object) {
                    dataOptions = $.extend(true, dataOptions, eData.dateOptions);
                }

                $.each(options, function (key) {
                    var attributeName = 'date' + key.charAt(0).toUpperCase() + key.slice(1);
                    if (eData[attributeName] !== undefined) {
                        dataOptions[key] = eData[attributeName];
                    }
                });
                return dataOptions;
            },

            place = function () {
                var position = (component || element).position(),
                    offset = (component || element).offset(),
                    vertical = options.widgetPositioning.vertical,
                    horizontal = options.widgetPositioning.horizontal,
                    parent;

                if (options.widgetParent) {
                    parent = options.widgetParent.append(widget);
                } else if (element.is('input')) {
                    parent = element.after(widget).parent();
                } else if (options.inline) {
                    parent = element.append(widget);
                    return;
                } else {
                    parent = element;
                    element.children().first().after(widget);
                }

                // Top and bottom logic
                if (vertical === 'auto') {
                    if (offset.top + widget.height() * 1.5 >= $(window).height() + $(window).scrollTop() &&
                        widget.height() + element.outerHeight() < offset.top) {
                        vertical = 'top';
                    } else {
                        vertical = 'bottom';
                    }
                }

                // Left and right logic
                if (horizontal === 'auto') {
                    if (parent.width() < offset.left + widget.outerWidth() / 2 &&
                        offset.left + widget.outerWidth() > $(window).width()) {
                        horizontal = 'right';
                    } else {
                        horizontal = 'left';
                    }
                }

                if (vertical === 'top') {
                    widget.addClass('top').removeClass('bottom');
                } else {
                    widget.addClass('bottom').removeClass('top');
                }

                if (horizontal === 'right') {
                    widget.addClass('pull-right');
                } else {
                    widget.removeClass('pull-right');
                }

                // find the first parent element that has a relative css positioning
                if (parent.css('position') !== 'relative') {
                    parent = parent.parents().filter(function () {
                        return $(this).css('position') === 'relative';
                    }).first();
                }

                if (parent.length === 0) {
                    throw new Error('datetimepicker component should be placed within a relative positioned container');
                }

                widget.css({
                    top: vertical === 'top' ? 'auto' : position.top + element.outerHeight(),
                    bottom: vertical === 'top' ? position.top + element.outerHeight() : 'auto',
                    left: horizontal === 'left' ? (parent === element ? 0 : position.left) : 'auto',
                    right: horizontal === 'left' ? 'auto' : parent.outerWidth() - element.outerWidth() - (parent === element ? 0 : position.left)
                });
            },

            notifyEvent = function (e) {
                if (e.type === 'dp.change' && ((e.date && e.date.isSame(e.oldDate)) || (!e.date && !e.oldDate))) {
                    return;
                }
                element.trigger(e);
            },

            viewUpdate = function (e) {
                if (e === 'y') {
                    e = 'YYYY';
                }
                notifyEvent({
                    type: 'dp.update',
                    change: e,
                    viewDate: viewDate.clone()
                });
            },

            showMode = function (dir) {
                if (!widget) {
                    return;
                }
                if (dir) {
                    currentViewMode = Math.max(minViewModeNumber, Math.min(3, currentViewMode + dir));
                }
                widget.find('.datepicker > div').hide().filter('.datepicker-' + datePickerModes[currentViewMode].clsName).show();
            },

            fillDow = function () {
                var row = $('<tr>'),
                    currentDate = viewDate.clone().startOf('w').startOf('d');

                if (options.calendarWeeks === true) {
                    row.append($('<th>').addClass('cw').text('#'));
                }

                while (currentDate.isBefore(viewDate.clone().endOf('w'))) {
                    row.append($('<th>').addClass('dow').text(currentDate.format('dd')));
                    currentDate.add(1, 'd');
                }
                widget.find('.datepicker-days thead').append(row);
            },

            isInDisabledDates = function (testDate) {
                return options.disabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isInEnabledDates = function (testDate) {
                return options.enabledDates[testDate.format('YYYY-MM-DD')] === true;
            },

            isInDisabledHours = function (testDate) {
                return options.disabledHours[testDate.format('H')] === true;
            },

            isInEnabledHours = function (testDate) {
                return options.enabledHours[testDate.format('H')] === true;
            },

            isValid = function (targetMoment, granularity) {
                if (!targetMoment.isValid()) {
                    return false;
                }
                if (options.disabledDates && granularity === 'd' && isInDisabledDates(targetMoment)) {
                    return false;
                }
                if (options.enabledDates && granularity === 'd' && !isInEnabledDates(targetMoment)) {
                    return false;
                }
                if (options.minDate && targetMoment.isBefore(options.minDate, granularity)) {
                    return false;
                }
                if (options.maxDate && targetMoment.isAfter(options.maxDate, granularity)) {
                    return false;
                }
                if (options.daysOfWeekDisabled && granularity === 'd' && options.daysOfWeekDisabled.indexOf(targetMoment.day()) !== -1) {
                    return false;
                }
                if (options.disabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && isInDisabledHours(targetMoment)) {
                    return false;
                }
                if (options.enabledHours && (granularity === 'h' || granularity === 'm' || granularity === 's') && !isInEnabledHours(targetMoment)) {
                    return false;
                }
                if (options.disabledTimeIntervals && (granularity === 'h' || granularity === 'm' || granularity === 's')) {
                    var found = false;
                    $.each(options.disabledTimeIntervals, function () {
                        if (targetMoment.isBetween(this[0], this[1])) {
                            found = true;
                            return false;
                        }
                    });
                    if (found) {
                        return false;
                    }
                }
                return true;
            },

            fillMonths = function () {
                var spans = [],
                    monthsShort = viewDate.clone().startOf('y').startOf('d');
                while (monthsShort.isSame(viewDate, 'y')) {
                    spans.push($('<span>').attr('data-action', 'selectMonth').addClass('month').text(monthsShort.format('MMM')));
                    monthsShort.add(1, 'M');
                }
                widget.find('.datepicker-months td').empty().append(spans);
            },

            updateMonths = function () {
                var monthsView = widget.find('.datepicker-months'),
                    monthsViewHeader = monthsView.find('th'),
                    months = monthsView.find('tbody').find('span');

                monthsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevYear);
                monthsViewHeader.eq(1).attr('title', options.tooltips.selectYear);
                monthsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextYear);

                monthsView.find('.disabled').removeClass('disabled');

                if (!isValid(viewDate.clone().subtract(1, 'y'), 'y')) {
                    monthsViewHeader.eq(0).addClass('disabled');
                }

                monthsViewHeader.eq(1).text(viewDate.year());

                if (!isValid(viewDate.clone().add(1, 'y'), 'y')) {
                    monthsViewHeader.eq(2).addClass('disabled');
                }

                months.removeClass('active');
                if (date.isSame(viewDate, 'y') && !unset) {
                    months.eq(date.month()).addClass('active');
                }

                months.each(function (index) {
                    if (!isValid(viewDate.clone().month(index), 'M')) {
                        $(this).addClass('disabled');
                    }
                });
            },

            updateYears = function () {
                var yearsView = widget.find('.datepicker-years'),
                    yearsViewHeader = yearsView.find('th'),
                    startYear = viewDate.clone().subtract(5, 'y'),
                    endYear = viewDate.clone().add(6, 'y'),
                    html = '';

                yearsViewHeader.eq(0).find('span').attr('title', options.tooltips.prevDecade);
                yearsViewHeader.eq(1).attr('title', options.tooltips.selectDecade);
                yearsViewHeader.eq(2).find('span').attr('title', options.tooltips.nextDecade);

                yearsView.find('.disabled').removeClass('disabled');

                if (options.minDate && options.minDate.isAfter(startYear, 'y')) {
                    yearsViewHeader.eq(0).addClass('disabled');
                }

                yearsViewHeader.eq(1).text(startYear.year() + '-' + endYear.year());

                if (options.maxDate && options.maxDate.isBefore(endYear, 'y')) {
                    yearsViewHeader.eq(2).addClass('disabled');
                }

                while (!startYear.isAfter(endYear, 'y')) {
                    html += '<span data-action="selectYear" class="year' + (startYear.isSame(date, 'y') && !unset ? ' active' : '') + (!isValid(startYear, 'y') ? ' disabled' : '') + '">' + startYear.year() + '</span>';
                    startYear.add(1, 'y');
                }

                yearsView.find('td').html(html);
            },

            updateDecades = function () {
                var decadesView = widget.find('.datepicker-decades'),
                    decadesViewHeader = decadesView.find('th'),
                    startDecade = moment({y: viewDate.year() - (viewDate.year() % 100) - 1}),
                    endDecade = startDecade.clone().add(100, 'y'),
                    startedAt = startDecade.clone(),
                    html = '';

                decadesViewHeader.eq(0).find('span').attr('title', options.tooltips.prevCentury);
                decadesViewHeader.eq(2).find('span').attr('title', options.tooltips.nextCentury);

                decadesView.find('.disabled').removeClass('disabled');

                if (startDecade.isSame(moment({y: 1900})) || (options.minDate && options.minDate.isAfter(startDecade, 'y'))) {
                    decadesViewHeader.eq(0).addClass('disabled');
                }

                decadesViewHeader.eq(1).text(startDecade.year() + '-' + endDecade.year());

                if (startDecade.isSame(moment({y: 2000})) || (options.maxDate && options.maxDate.isBefore(endDecade, 'y'))) {
                    decadesViewHeader.eq(2).addClass('disabled');
                }

                while (!startDecade.isAfter(endDecade, 'y')) {
                    html += '<span data-action="selectDecade" class="decade' + (startDecade.isSame(date, 'y') ? ' active' : '') +
                        (!isValid(startDecade, 'y') ? ' disabled' : '') + '" data-selection="' + (startDecade.year() + 6) + '">' + (startDecade.year() + 1) + ' - ' + (startDecade.year() + 12) + '</span>';
                    startDecade.add(12, 'y');
                }
                html += '<span></span><span></span><span></span>'; //push the dangling block over, at least this way it's even

                decadesView.find('td').html(html);
                decadesViewHeader.eq(1).text((startedAt.year() + 1) + '-' + (startDecade.year()));
            },

            fillDate = function () {
                var daysView = widget.find('.datepicker-days'),
                    daysViewHeader = daysView.find('th'),
                    currentDate,
                    html = [],
                    row,
                    clsName,
                    i;

                if (!hasDate()) {
                    return;
                }

                daysViewHeader.eq(0).find('span').attr('title', options.tooltips.prevMonth);
                daysViewHeader.eq(1).attr('title', options.tooltips.selectMonth);
                daysViewHeader.eq(2).find('span').attr('title', options.tooltips.nextMonth);

                daysView.find('.disabled').removeClass('disabled');
                daysViewHeader.eq(1).text(viewDate.format(options.dayViewHeaderFormat));

                if (!isValid(viewDate.clone().subtract(1, 'M'), 'M')) {
                    daysViewHeader.eq(0).addClass('disabled');
                }
                if (!isValid(viewDate.clone().add(1, 'M'), 'M')) {
                    daysViewHeader.eq(2).addClass('disabled');
                }

                currentDate = viewDate.clone().startOf('M').startOf('w').startOf('d');

                for (i = 0; i < 42; i++) { //always display 42 days (should show 6 weeks)
                    if (currentDate.weekday() === 0) {
                        row = $('<tr>');
                        if (options.calendarWeeks) {
                            row.append('<td class="cw">' + currentDate.week() + '</td>');
                        }
                        html.push(row);
                    }
                    clsName = '';
                    if (currentDate.isBefore(viewDate, 'M')) {
                        clsName += ' old';
                    }
                    if (currentDate.isAfter(viewDate, 'M')) {
                        clsName += ' new';
                    }
                    if (currentDate.isSame(date, 'd') && !unset) {
                        clsName += ' active';
                    }
                    if (!isValid(currentDate, 'd')) {
                        clsName += ' disabled';
                    }
                    if (currentDate.isSame(getMoment(), 'd')) {
                        clsName += ' today';
                    }
                    if (currentDate.day() === 0 || currentDate.day() === 6) {
                        clsName += ' weekend';
                    }
                    row.append('<td data-action="selectDay" data-day="' + currentDate.format('L') + '" class="day' + clsName + '">' + currentDate.date() + '</td>');
                    currentDate.add(1, 'd');
                }

                daysView.find('tbody').empty().append(html);

                updateMonths();

                updateYears();

                updateDecades();
            },

            fillHours = function () {
                var table = widget.find('.timepicker-hours table'),
                    currentHour = viewDate.clone().startOf('d'),
                    html = [],
                    row = $('<tr>');

                if (viewDate.hour() > 11 && !use24Hours) {
                    currentHour.hour(12);
                }
                while (currentHour.isSame(viewDate, 'd') && (use24Hours || (viewDate.hour() < 12 && currentHour.hour() < 12) || viewDate.hour() > 11)) {
                    if (currentHour.hour() % 4 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectHour" class="hour' + (!isValid(currentHour, 'h') ? ' disabled' : '') + '">' + currentHour.format(use24Hours ? 'HH' : 'hh') + '</td>');
                    currentHour.add(1, 'h');
                }
                table.empty().append(html);
            },

            fillMinutes = function () {
                var table = widget.find('.timepicker-minutes table'),
                    currentMinute = viewDate.clone().startOf('h'),
                    html = [],
                    row = $('<tr>'),
                    step = options.stepping === 1 ? 5 : options.stepping;

                while (viewDate.isSame(currentMinute, 'h')) {
                    if (currentMinute.minute() % (step * 4) === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectMinute" class="minute' + (!isValid(currentMinute, 'm') ? ' disabled' : '') + '">' + currentMinute.format('mm') + '</td>');
                    currentMinute.add(step, 'm');
                }
                table.empty().append(html);
            },

            fillSeconds = function () {
                var table = widget.find('.timepicker-seconds table'),
                    currentSecond = viewDate.clone().startOf('m'),
                    html = [],
                    row = $('<tr>');

                while (viewDate.isSame(currentSecond, 'm')) {
                    if (currentSecond.second() % 20 === 0) {
                        row = $('<tr>');
                        html.push(row);
                    }
                    row.append('<td data-action="selectSecond" class="second' + (!isValid(currentSecond, 's') ? ' disabled' : '') + '">' + currentSecond.format('ss') + '</td>');
                    currentSecond.add(5, 's');
                }

                table.empty().append(html);
            },

            fillTime = function () {
                var toggle, newDate, timeComponents = widget.find('.timepicker span[data-time-component]');

                if (!use24Hours) {
                    toggle = widget.find('.timepicker [data-action=togglePeriod]');
                    newDate = date.clone().add((date.hours() >= 12) ? -12 : 12, 'h');

                    toggle.text(date.format('A'));

                    if (isValid(newDate, 'h')) {
                        toggle.removeClass('disabled');
                    } else {
                        toggle.addClass('disabled');
                    }
                }
                timeComponents.filter('[data-time-component=hours]').text(date.format(use24Hours ? 'HH' : 'hh'));
                timeComponents.filter('[data-time-component=minutes]').text(date.format('mm'));
                timeComponents.filter('[data-time-component=seconds]').text(date.format('ss'));

                fillHours();
                fillMinutes();
                fillSeconds();
            },

            update = function () {
                if (!widget) {
                    return;
                }
                fillDate();
                fillTime();
            },

            setValue = function (targetMoment) {
                var oldDate = unset ? null : date;

                // case of calling setValue(null or false)
                if (!targetMoment) {
                    unset = true;
                    input.val('');
                    element.data('date', '');
                    notifyEvent({
                        type: 'dp.change',
                        date: false,
                        oldDate: oldDate
                    });
                    update();
                    return;
                }

                targetMoment = targetMoment.clone().locale(options.locale);

                if (options.stepping !== 1) {
                    targetMoment.minutes((Math.round(targetMoment.minutes() / options.stepping) * options.stepping) % 60).seconds(0);
                }

                if (isValid(targetMoment)) {
                    date = targetMoment;
                    viewDate = date.clone();
                    input.val(date.format(actualFormat));
                    element.data('date', date.format(actualFormat));
                    unset = false;
                    update();
                    notifyEvent({
                        type: 'dp.change',
                        date: date.clone(),
                        oldDate: oldDate
                    });
                } else {
                    if (!options.keepInvalid) {
                        input.val(unset ? '' : date.format(actualFormat));
                    }
                    notifyEvent({
                        type: 'dp.error',
                        date: targetMoment
                    });
                }
            },

            hide = function () {
                ///<summary>Hides the widget. Possibly will emit dp.hide</summary>
                var transitioning = false;
                if (!widget) {
                    return picker;
                }
                // Ignore event if in the middle of a picker transition
                widget.find('.collapse').each(function () {
                    var collapseData = $(this).data('collapse');
                    if (collapseData && collapseData.transitioning) {
                        transitioning = true;
                        return false;
                    }
                    return true;
                });
                if (transitioning) {
                    return picker;
                }
                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.hide();

                $(window).off('resize', place);
                widget.off('click', '[data-action]');
                widget.off('mousedown', false);

                widget.remove();
                widget = false;

                notifyEvent({
                    type: 'dp.hide',
                    date: date.clone()
                });

                input.blur();

                return picker;
            },

            clear = function () {
                setValue(null);
            },

            /********************************************************************************
             *
             * Widget UI interaction functions
             *
             ********************************************************************************/
            actions = {
                next: function () {
                    var navFnc = datePickerModes[currentViewMode].navFnc;
                    viewDate.add(datePickerModes[currentViewMode].navStep, navFnc);
                    fillDate();
                    viewUpdate(navFnc);
                },

                previous: function () {
                    var navFnc = datePickerModes[currentViewMode].navFnc;
                    viewDate.subtract(datePickerModes[currentViewMode].navStep, navFnc);
                    fillDate();
                    viewUpdate(navFnc);
                },

                pickerSwitch: function () {
                    showMode(1);
                },

                selectMonth: function (e) {
                    var month = $(e.target).closest('tbody').find('span').index($(e.target));
                    viewDate.month(month);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()).month(viewDate.month()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('M');
                },

                selectYear: function (e) {
                    var year = parseInt($(e.target).text(), 10) || 0;
                    viewDate.year(year);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('YYYY');
                },

                selectDecade: function (e) {
                    var year = parseInt($(e.target).data('selection'), 10) || 0;
                    viewDate.year(year);
                    if (currentViewMode === minViewModeNumber) {
                        setValue(date.clone().year(viewDate.year()));
                        if (!options.inline) {
                            hide();
                        }
                    } else {
                        showMode(-1);
                        fillDate();
                    }
                    viewUpdate('YYYY');
                },

                selectDay: function (e) {
                    var day = viewDate.clone();
                    if ($(e.target).is('.old')) {
                        day.subtract(1, 'M');
                    }
                    if ($(e.target).is('.new')) {
                        day.add(1, 'M');
                    }
                    setValue(day.date(parseInt($(e.target).text(), 10)));
                    if (!hasTime() && !options.keepOpen && !options.inline) {
                        hide();
                    }
                },

                incrementHours: function () {
                    var newDate = date.clone().add(1, 'h');
                    if (isValid(newDate, 'h')) {
                        setValue(newDate);
                    }
                },

                incrementMinutes: function () {
                    var newDate = date.clone().add(options.stepping, 'm');
                    if (isValid(newDate, 'm')) {
                        setValue(newDate);
                    }
                },

                incrementSeconds: function () {
                    var newDate = date.clone().add(1, 's');
                    if (isValid(newDate, 's')) {
                        setValue(newDate);
                    }
                },

                decrementHours: function () {
                    var newDate = date.clone().subtract(1, 'h');
                    if (isValid(newDate, 'h')) {
                        setValue(newDate);
                    }
                },

                decrementMinutes: function () {
                    var newDate = date.clone().subtract(options.stepping, 'm');
                    if (isValid(newDate, 'm')) {
                        setValue(newDate);
                    }
                },

                decrementSeconds: function () {
                    var newDate = date.clone().subtract(1, 's');
                    if (isValid(newDate, 's')) {
                        setValue(newDate);
                    }
                },

                togglePeriod: function () {
                    setValue(date.clone().add((date.hours() >= 12) ? -12 : 12, 'h'));
                },

                togglePicker: function (e) {
                    var $this = $(e.target),
                        $parent = $this.closest('ul'),
                        expanded = $parent.find('.in'),
                        closed = $parent.find('.collapse:not(.in)'),
                        collapseData;

                    if (expanded && expanded.length) {
                        collapseData = expanded.data('collapse');
                        if (collapseData && collapseData.transitioning) {
                            return;
                        }
                        if (expanded.collapse) { // if collapse plugin is available through bootstrap.js then use it
                            expanded.collapse('hide');
                            closed.collapse('show');
                        } else { // otherwise just toggle in class on the two views
                            expanded.removeClass('in');
                            closed.addClass('in');
                        }
                        if ($this.is('span')) {
                            $this.toggleClass(options.icons.time + ' ' + options.icons.date);
                        } else {
                            $this.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        }

                        // NOTE: uncomment if toggled state will be restored in show()
                        //if (component) {
                        //    component.find('span').toggleClass(options.icons.time + ' ' + options.icons.date);
                        //}
                    }
                },

                showPicker: function () {
                    widget.find('.timepicker > div:not(.timepicker-picker)').hide();
                    widget.find('.timepicker .timepicker-picker').show();
                },

                showHours: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-hours').show();
                },

                showMinutes: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-minutes').show();
                },

                showSeconds: function () {
                    widget.find('.timepicker .timepicker-picker').hide();
                    widget.find('.timepicker .timepicker-seconds').show();
                },

                selectHour: function (e) {
                    var hour = parseInt($(e.target).text(), 10);

                    if (!use24Hours) {
                        if (date.hours() >= 12) {
                            if (hour !== 12) {
                                hour += 12;
                            }
                        } else {
                            if (hour === 12) {
                                hour = 0;
                            }
                        }
                    }
                    setValue(date.clone().hours(hour));
                    actions.showPicker.call(picker);
                },

                selectMinute: function (e) {
                    setValue(date.clone().minutes(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                selectSecond: function (e) {
                    setValue(date.clone().seconds(parseInt($(e.target).text(), 10)));
                    actions.showPicker.call(picker);
                },

                clear: clear,

                today: function () {
                    var todaysDate = getMoment();
                    if (isValid(todaysDate, 'd')) {
                        setValue(todaysDate);
                    }
                },

                close: hide
            },

            doAction = function (e) {
                if ($(e.currentTarget).is('.disabled')) {
                    return false;
                }
                actions[$(e.currentTarget).data('action')].apply(picker, arguments);
                return false;
            },

            show = function () {
                ///<summary>Shows the widget. Possibly will emit dp.show and dp.change</summary>
                var currentMoment,
                    useCurrentGranularity = {
                        'year': function (m) {
                            return m.month(0).date(1).hours(0).seconds(0).minutes(0);
                        },
                        'month': function (m) {
                            return m.date(1).hours(0).seconds(0).minutes(0);
                        },
                        'day': function (m) {
                            return m.hours(0).seconds(0).minutes(0);
                        },
                        'hour': function (m) {
                            return m.seconds(0).minutes(0);
                        },
                        'minute': function (m) {
                            return m.seconds(0);
                        }
                    };

                if (input.prop('disabled') || (!options.ignoreReadonly && input.prop('readonly')) || widget) {
                    return picker;
                }
                if (input.val() !== undefined && input.val().trim().length !== 0) {
                    setValue(parseInputDate(input.val().trim()));
                } else if (options.useCurrent && unset && ((input.is('input') && input.val().trim().length === 0) || options.inline)) {
                    currentMoment = getMoment();
                    if (typeof options.useCurrent === 'string') {
                        currentMoment = useCurrentGranularity[options.useCurrent](currentMoment);
                    }
                    setValue(currentMoment);
                }

                widget = getTemplate();

                fillDow();
                fillMonths();

                widget.find('.timepicker-hours').hide();
                widget.find('.timepicker-minutes').hide();
                widget.find('.timepicker-seconds').hide();

                update();
                showMode();

                $(window).on('resize', place);
                widget.on('click', '[data-action]', doAction); // this handles clicks on the widget
                widget.on('mousedown', false);

                if (component && component.hasClass('btn')) {
                    component.toggleClass('active');
                }
                widget.show();
                place();

                if (options.focusOnShow && !input.is(':focus')) {
                    input.focus();
                }

                notifyEvent({
                    type: 'dp.show'
                });
                return picker;
            },

            toggle = function () {
                /// <summary>Shows or hides the widget</summary>
                return (widget ? hide() : show());
            },

            parseInputDate = function (inputDate) {
                if (options.parseInputDate === undefined) {
                    if (moment.isMoment(inputDate) || inputDate instanceof Date) {
                        inputDate = moment(inputDate);
                    } else {
                        inputDate = getMoment(inputDate);
                    }
                } else {
                    inputDate = options.parseInputDate(inputDate);
                }
                inputDate.locale(options.locale);
                return inputDate;
            },

            keydown = function (e) {
                var handler = null,
                    index,
                    index2,
                    pressedKeys = [],
                    pressedModifiers = {},
                    currentKey = e.which,
                    keyBindKeys,
                    allModifiersPressed,
                    pressed = 'p';

                keyState[currentKey] = pressed;

                for (index in keyState) {
                    if (keyState.hasOwnProperty(index) && keyState[index] === pressed) {
                        pressedKeys.push(index);
                        if (parseInt(index, 10) !== currentKey) {
                            pressedModifiers[index] = true;
                        }
                    }
                }

                for (index in options.keyBinds) {
                    if (options.keyBinds.hasOwnProperty(index) && typeof (options.keyBinds[index]) === 'function') {
                        keyBindKeys = index.split(' ');
                        if (keyBindKeys.length === pressedKeys.length && keyMap[currentKey] === keyBindKeys[keyBindKeys.length - 1]) {
                            allModifiersPressed = true;
                            for (index2 = keyBindKeys.length - 2; index2 >= 0; index2--) {
                                if (!(keyMap[keyBindKeys[index2]] in pressedModifiers)) {
                                    allModifiersPressed = false;
                                    break;
                                }
                            }
                            if (allModifiersPressed) {
                                handler = options.keyBinds[index];
                                break;
                            }
                        }
                    }
                }

                if (handler) {
                    handler.call(picker, widget);
                    e.stopPropagation();
                    e.preventDefault();
                }
            },

            keyup = function (e) {
                keyState[e.which] = 'r';
                e.stopPropagation();
                e.preventDefault();
            },

            change = function (e) {
                var val = $(e.target).val().trim(),
                    parsedDate = val ? parseInputDate(val) : null;
                setValue(parsedDate);
                e.stopImmediatePropagation();
                return false;
            },

            attachDatePickerElementEvents = function () {
                input.on({
                    'change': change,
                    'blur': options.debug ? '' : hide,
                    'keydown': keydown,
                    'keyup': keyup,
                    'focus': options.allowInputToggle ? show : ''
                });

                if (element.is('input')) {
                    input.on({
                        'focus': show
                    });
                } else if (component) {
                    component.on('click', toggle);
                    component.on('mousedown', false);
                }
            },

            detachDatePickerElementEvents = function () {
                input.off({
                    'change': change,
                    'blur': blur,
                    'keydown': keydown,
                    'keyup': keyup,
                    'focus': options.allowInputToggle ? hide : ''
                });

                if (element.is('input')) {
                    input.off({
                        'focus': show
                    });
                } else if (component) {
                    component.off('click', toggle);
                    component.off('mousedown', false);
                }
            },

            indexGivenDates = function (givenDatesArray) {
                // Store given enabledDates and disabledDates as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: options.enabledDates['2014-02-27'] === true)
                var givenDatesIndexed = {};
                $.each(givenDatesArray, function () {
                    var dDate = parseInputDate(this);
                    if (dDate.isValid()) {
                        givenDatesIndexed[dDate.format('YYYY-MM-DD')] = true;
                    }
                });
                return (Object.keys(givenDatesIndexed).length) ? givenDatesIndexed : false;
            },

            indexGivenHours = function (givenHoursArray) {
                // Store given enabledHours and disabledHours as keys.
                // This way we can check their existence in O(1) time instead of looping through whole array.
                // (for example: options.enabledHours['2014-02-27'] === true)
                var givenHoursIndexed = {};
                $.each(givenHoursArray, function () {
                    givenHoursIndexed[this] = true;
                });
                return (Object.keys(givenHoursIndexed).length) ? givenHoursIndexed : false;
            },

            initFormatting = function () {
                var format = options.format || 'L LT';

                actualFormat = format.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput) {
                    var newinput = date.localeData().longDateFormat(formatInput) || formatInput;
                    return newinput.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (formatInput2) { //temp fix for #740
                        return date.localeData().longDateFormat(formatInput2) || formatInput2;
                    });
                });


                parseFormats = options.extraFormats ? options.extraFormats.slice() : [];
                if (parseFormats.indexOf(format) < 0 && parseFormats.indexOf(actualFormat) < 0) {
                    parseFormats.push(actualFormat);
                }

                use24Hours = (actualFormat.toLowerCase().indexOf('a') < 1 && actualFormat.replace(/\[.*?\]/g, '').indexOf('h') < 1);

                if (isEnabled('y')) {
                    minViewModeNumber = 2;
                }
                if (isEnabled('M')) {
                    minViewModeNumber = 1;
                }
                if (isEnabled('d')) {
                    minViewModeNumber = 0;
                }

                currentViewMode = Math.max(minViewModeNumber, currentViewMode);

                if (!unset) {
                    setValue(date);
                }
            };

        /********************************************************************************
         *
         * Public API functions
         * =====================
         *
         * Important: Do not expose direct references to private objects or the options
         * object to the outer world. Always return a clone when returning values or make
         * a clone when setting a private variable.
         *
         ********************************************************************************/
        picker.destroy = function () {
            ///<summary>Destroys the widget and removes all attached event listeners</summary>
            hide();
            detachDatePickerElementEvents();
            element.removeData('DateTimePicker');
            element.removeData('date');
        };

        picker.toggle = toggle;

        picker.show = show;

        picker.hide = hide;

        picker.disable = function () {
            ///<summary>Disables the input element, the component is attached to, by adding a disabled="true" attribute to it.
            ///If the widget was visible before that call it is hidden. Possibly emits dp.hide</summary>
            hide();
            if (component && component.hasClass('btn')) {
                component.addClass('disabled');
            }
            input.prop('disabled', true);
            return picker;
        };

        picker.enable = function () {
            ///<summary>Enables the input element, the component is attached to, by removing disabled attribute from it.</summary>
            if (component && component.hasClass('btn')) {
                component.removeClass('disabled');
            }
            input.prop('disabled', false);
            return picker;
        };

        picker.ignoreReadonly = function (ignoreReadonly) {
            if (arguments.length === 0) {
                return options.ignoreReadonly;
            }
            if (typeof ignoreReadonly !== 'boolean') {
                throw new TypeError('ignoreReadonly () expects a boolean parameter');
            }
            options.ignoreReadonly = ignoreReadonly;
            return picker;
        };

        picker.options = function (newOptions) {
            if (arguments.length === 0) {
                return $.extend(true, {}, options);
            }

            if (!(newOptions instanceof Object)) {
                throw new TypeError('options() options parameter should be an object');
            }
            $.extend(true, options, newOptions);
            $.each(options, function (key, value) {
                if (picker[key] !== undefined) {
                    picker[key](value);
                } else {
                    throw new TypeError('option ' + key + ' is not recognized!');
                }
            });
            return picker;
        };

        picker.date = function (newDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.date">
            ///<summary>Returns the component's model current date, a moment object or null if not set.</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, Date, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                if (unset) {
                    return null;
                }
                return date.clone();
            }

            if (newDate !== null && typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
            }

            setValue(newDate === null ? null : parseInputDate(newDate));
            return picker;
        };

        picker.format = function (newFormat) {
            ///<summary>test su</summary>
            ///<param name="newFormat">info about para</param>
            ///<returns type="string|boolean">returns foo</returns>
            if (arguments.length === 0) {
                return options.format;
            }

            if ((typeof newFormat !== 'string') && ((typeof newFormat !== 'boolean') || (newFormat !== false))) {
                throw new TypeError('format() expects a sting or boolean:false parameter ' + newFormat);
            }

            options.format = newFormat;
            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.timeZone = function (newZone) {
            if (arguments.length === 0) {
                return options.timeZone;
            }

            options.timeZone = newZone;

            return picker;
        };

        picker.dayViewHeaderFormat = function (newFormat) {
            if (arguments.length === 0) {
                return options.dayViewHeaderFormat;
            }

            if (typeof newFormat !== 'string') {
                throw new TypeError('dayViewHeaderFormat() expects a string parameter');
            }

            options.dayViewHeaderFormat = newFormat;
            return picker;
        };

        picker.extraFormats = function (formats) {
            if (arguments.length === 0) {
                return options.extraFormats;
            }

            if (formats !== false && !(formats instanceof Array)) {
                throw new TypeError('extraFormats() expects an array or false parameter');
            }

            options.extraFormats = formats;
            if (parseFormats) {
                initFormatting(); // reinit formatting
            }
            return picker;
        };

        picker.disabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledDates">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledDates ? $.extend({}, options.disabledDates) : options.disabledDates);
            }

            if (!dates) {
                options.disabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('disabledDates() expects an array parameter');
            }
            options.disabledDates = indexGivenDates(dates);
            options.enabledDates = false;
            update();
            return picker;
        };

        picker.enabledDates = function (dates) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledDates">
            ///<summary>Returns an array with the currently set enabled dates on the component.</summary>
            ///<returns type="array">options.enabledDates</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.enabledDates_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.enabledDates ? $.extend({}, options.enabledDates) : options.enabledDates);
            }

            if (!dates) {
                options.enabledDates = false;
                update();
                return picker;
            }
            if (!(dates instanceof Array)) {
                throw new TypeError('enabledDates() expects an array parameter');
            }
            options.enabledDates = indexGivenDates(dates);
            options.disabledDates = false;
            update();
            return picker;
        };

        picker.daysOfWeekDisabled = function (daysOfWeekDisabled) {
            if (arguments.length === 0) {
                return options.daysOfWeekDisabled.splice(0);
            }

            if ((typeof daysOfWeekDisabled === 'boolean') && !daysOfWeekDisabled) {
                options.daysOfWeekDisabled = false;
                update();
                return picker;
            }

            if (!(daysOfWeekDisabled instanceof Array)) {
                throw new TypeError('daysOfWeekDisabled() expects an array parameter');
            }
            options.daysOfWeekDisabled = daysOfWeekDisabled.reduce(function (previousValue, currentValue) {
                currentValue = parseInt(currentValue, 10);
                if (currentValue > 6 || currentValue < 0 || isNaN(currentValue)) {
                    return previousValue;
                }
                if (previousValue.indexOf(currentValue) === -1) {
                    previousValue.push(currentValue);
                }
                return previousValue;
            }, []).sort();
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'd')) {
                    date.add(1, 'd');
                    if (tries === 7) {
                        throw 'Tried 7 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.maxDate = function (maxDate) {
            if (arguments.length === 0) {
                return options.maxDate ? options.maxDate.clone() : options.maxDate;
            }

            if ((typeof maxDate === 'boolean') && maxDate === false) {
                options.maxDate = false;
                update();
                return picker;
            }

            if (typeof maxDate === 'string') {
                if (maxDate === 'now' || maxDate === 'moment') {
                    maxDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(maxDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('maxDate() Could not parse date parameter: ' + maxDate);
            }
            if (options.minDate && parsedDate.isBefore(options.minDate)) {
                throw new TypeError('maxDate() date parameter is before options.minDate: ' + parsedDate.format(actualFormat));
            }
            options.maxDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isAfter(maxDate)) {
                setValue(options.maxDate);
            }
            if (viewDate.isAfter(parsedDate)) {
                viewDate = parsedDate.clone().subtract(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.minDate = function (minDate) {
            if (arguments.length === 0) {
                return options.minDate ? options.minDate.clone() : options.minDate;
            }

            if ((typeof minDate === 'boolean') && minDate === false) {
                options.minDate = false;
                update();
                return picker;
            }

            if (typeof minDate === 'string') {
                if (minDate === 'now' || minDate === 'moment') {
                    minDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(minDate);

            if (!parsedDate.isValid()) {
                throw new TypeError('minDate() Could not parse date parameter: ' + minDate);
            }
            if (options.maxDate && parsedDate.isAfter(options.maxDate)) {
                throw new TypeError('minDate() date parameter is after options.maxDate: ' + parsedDate.format(actualFormat));
            }
            options.minDate = parsedDate;
            if (options.useCurrent && !options.keepInvalid && date.isBefore(minDate)) {
                setValue(options.minDate);
            }
            if (viewDate.isBefore(parsedDate)) {
                viewDate = parsedDate.clone().add(options.stepping, 'm');
            }
            update();
            return picker;
        };

        picker.defaultDate = function (defaultDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.defaultDate">
            ///<summary>Returns a moment with the options.defaultDate option configuration or false if not set</summary>
            ///<returns type="Moment">date.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Will set the picker's inital date. If a boolean:false value is passed the options.defaultDate parameter is cleared.</summary>
            ///<param name="defaultDate" locid="$.fn.datetimepicker.defaultDate_p:defaultDate">Takes a string, Date, moment, boolean:false</param>
            ///</signature>
            if (arguments.length === 0) {
                return options.defaultDate ? options.defaultDate.clone() : options.defaultDate;
            }
            if (!defaultDate) {
                options.defaultDate = false;
                return picker;
            }

            if (typeof defaultDate === 'string') {
                if (defaultDate === 'now' || defaultDate === 'moment') {
                    defaultDate = getMoment();
                }
            }

            var parsedDate = parseInputDate(defaultDate);
            if (!parsedDate.isValid()) {
                throw new TypeError('defaultDate() Could not parse date parameter: ' + defaultDate);
            }
            if (!isValid(parsedDate)) {
                throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
            }

            options.defaultDate = parsedDate;

            if ((options.defaultDate && options.inline) || input.val().trim() === '') {
                setValue(options.defaultDate);
            }
            return picker;
        };

        picker.locale = function (locale) {
            if (arguments.length === 0) {
                return options.locale;
            }

            if (!moment.localeData(locale)) {
                throw new TypeError('locale() locale ' + locale + ' is not loaded from moment locales!');
            }

            options.locale = locale;
            date.locale(options.locale);
            viewDate.locale(options.locale);

            if (actualFormat) {
                initFormatting(); // reinit formatting
            }
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.stepping = function (stepping) {
            if (arguments.length === 0) {
                return options.stepping;
            }

            stepping = parseInt(stepping, 10);
            if (isNaN(stepping) || stepping < 1) {
                stepping = 1;
            }
            options.stepping = stepping;
            return picker;
        };

        picker.useCurrent = function (useCurrent) {
            var useCurrentOptions = ['year', 'month', 'day', 'hour', 'minute'];
            if (arguments.length === 0) {
                return options.useCurrent;
            }

            if ((typeof useCurrent !== 'boolean') && (typeof useCurrent !== 'string')) {
                throw new TypeError('useCurrent() expects a boolean or string parameter');
            }
            if (typeof useCurrent === 'string' && useCurrentOptions.indexOf(useCurrent.toLowerCase()) === -1) {
                throw new TypeError('useCurrent() expects a string parameter of ' + useCurrentOptions.join(', '));
            }
            options.useCurrent = useCurrent;
            return picker;
        };

        picker.collapse = function (collapse) {
            if (arguments.length === 0) {
                return options.collapse;
            }

            if (typeof collapse !== 'boolean') {
                throw new TypeError('collapse() expects a boolean parameter');
            }
            if (options.collapse === collapse) {
                return picker;
            }
            options.collapse = collapse;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.icons = function (icons) {
            if (arguments.length === 0) {
                return $.extend({}, options.icons);
            }

            if (!(icons instanceof Object)) {
                throw new TypeError('icons() expects parameter to be an Object');
            }
            $.extend(options.icons, icons);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.tooltips = function (tooltips) {
            if (arguments.length === 0) {
                return $.extend({}, options.tooltips);
            }

            if (!(tooltips instanceof Object)) {
                throw new TypeError('tooltips() expects parameter to be an Object');
            }
            $.extend(options.tooltips, tooltips);
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.useStrict = function (useStrict) {
            if (arguments.length === 0) {
                return options.useStrict;
            }

            if (typeof useStrict !== 'boolean') {
                throw new TypeError('useStrict() expects a boolean parameter');
            }
            options.useStrict = useStrict;
            return picker;
        };

        picker.sideBySide = function (sideBySide) {
            if (arguments.length === 0) {
                return options.sideBySide;
            }

            if (typeof sideBySide !== 'boolean') {
                throw new TypeError('sideBySide() expects a boolean parameter');
            }
            options.sideBySide = sideBySide;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.viewMode = function (viewMode) {
            if (arguments.length === 0) {
                return options.viewMode;
            }

            if (typeof viewMode !== 'string') {
                throw new TypeError('viewMode() expects a string parameter');
            }

            if (viewModes.indexOf(viewMode) === -1) {
                throw new TypeError('viewMode() parameter must be one of (' + viewModes.join(', ') + ') value');
            }

            options.viewMode = viewMode;
            currentViewMode = Math.max(viewModes.indexOf(viewMode), minViewModeNumber);

            showMode();
            return picker;
        };

        picker.toolbarPlacement = function (toolbarPlacement) {
            if (arguments.length === 0) {
                return options.toolbarPlacement;
            }

            if (typeof toolbarPlacement !== 'string') {
                throw new TypeError('toolbarPlacement() expects a string parameter');
            }
            if (toolbarPlacements.indexOf(toolbarPlacement) === -1) {
                throw new TypeError('toolbarPlacement() parameter must be one of (' + toolbarPlacements.join(', ') + ') value');
            }
            options.toolbarPlacement = toolbarPlacement;

            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetPositioning = function (widgetPositioning) {
            if (arguments.length === 0) {
                return $.extend({}, options.widgetPositioning);
            }

            if (({}).toString.call(widgetPositioning) !== '[object Object]') {
                throw new TypeError('widgetPositioning() expects an object variable');
            }
            if (widgetPositioning.horizontal) {
                if (typeof widgetPositioning.horizontal !== 'string') {
                    throw new TypeError('widgetPositioning() horizontal variable must be a string');
                }
                widgetPositioning.horizontal = widgetPositioning.horizontal.toLowerCase();
                if (horizontalModes.indexOf(widgetPositioning.horizontal) === -1) {
                    throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + horizontalModes.join(', ') + ')');
                }
                options.widgetPositioning.horizontal = widgetPositioning.horizontal;
            }
            if (widgetPositioning.vertical) {
                if (typeof widgetPositioning.vertical !== 'string') {
                    throw new TypeError('widgetPositioning() vertical variable must be a string');
                }
                widgetPositioning.vertical = widgetPositioning.vertical.toLowerCase();
                if (verticalModes.indexOf(widgetPositioning.vertical) === -1) {
                    throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + verticalModes.join(', ') + ')');
                }
                options.widgetPositioning.vertical = widgetPositioning.vertical;
            }
            update();
            return picker;
        };

        picker.calendarWeeks = function (calendarWeeks) {
            if (arguments.length === 0) {
                return options.calendarWeeks;
            }

            if (typeof calendarWeeks !== 'boolean') {
                throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
            }

            options.calendarWeeks = calendarWeeks;
            update();
            return picker;
        };

        picker.showTodayButton = function (showTodayButton) {
            if (arguments.length === 0) {
                return options.showTodayButton;
            }

            if (typeof showTodayButton !== 'boolean') {
                throw new TypeError('showTodayButton() expects a boolean parameter');
            }

            options.showTodayButton = showTodayButton;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.showClear = function (showClear) {
            if (arguments.length === 0) {
                return options.showClear;
            }

            if (typeof showClear !== 'boolean') {
                throw new TypeError('showClear() expects a boolean parameter');
            }

            options.showClear = showClear;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.widgetParent = function (widgetParent) {
            if (arguments.length === 0) {
                return options.widgetParent;
            }

            if (typeof widgetParent === 'string') {
                widgetParent = $(widgetParent);
            }

            if (widgetParent !== null && (typeof widgetParent !== 'string' && !(widgetParent instanceof $))) {
                throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
            }

            options.widgetParent = widgetParent;
            if (widget) {
                hide();
                show();
            }
            return picker;
        };

        picker.keepOpen = function (keepOpen) {
            if (arguments.length === 0) {
                return options.keepOpen;
            }

            if (typeof keepOpen !== 'boolean') {
                throw new TypeError('keepOpen() expects a boolean parameter');
            }

            options.keepOpen = keepOpen;
            return picker;
        };

        picker.focusOnShow = function (focusOnShow) {
            if (arguments.length === 0) {
                return options.focusOnShow;
            }

            if (typeof focusOnShow !== 'boolean') {
                throw new TypeError('focusOnShow() expects a boolean parameter');
            }

            options.focusOnShow = focusOnShow;
            return picker;
        };

        picker.inline = function (inline) {
            if (arguments.length === 0) {
                return options.inline;
            }

            if (typeof inline !== 'boolean') {
                throw new TypeError('inline() expects a boolean parameter');
            }

            options.inline = inline;
            return picker;
        };

        picker.clear = function () {
            clear();
            return picker;
        };

        picker.keyBinds = function (keyBinds) {
            options.keyBinds = keyBinds;
            return picker;
        };

        picker.getMoment = function (d) {
            return getMoment(d);
        };

        picker.debug = function (debug) {
            if (typeof debug !== 'boolean') {
                throw new TypeError('debug() expects a boolean parameter');
            }

            options.debug = debug;
            return picker;
        };

        picker.allowInputToggle = function (allowInputToggle) {
            if (arguments.length === 0) {
                return options.allowInputToggle;
            }

            if (typeof allowInputToggle !== 'boolean') {
                throw new TypeError('allowInputToggle() expects a boolean parameter');
            }

            options.allowInputToggle = allowInputToggle;
            return picker;
        };

        picker.showClose = function (showClose) {
            if (arguments.length === 0) {
                return options.showClose;
            }

            if (typeof showClose !== 'boolean') {
                throw new TypeError('showClose() expects a boolean parameter');
            }

            options.showClose = showClose;
            return picker;
        };

        picker.keepInvalid = function (keepInvalid) {
            if (arguments.length === 0) {
                return options.keepInvalid;
            }

            if (typeof keepInvalid !== 'boolean') {
                throw new TypeError('keepInvalid() expects a boolean parameter');
            }
            options.keepInvalid = keepInvalid;
            return picker;
        };

        picker.datepickerInput = function (datepickerInput) {
            if (arguments.length === 0) {
                return options.datepickerInput;
            }

            if (typeof datepickerInput !== 'string') {
                throw new TypeError('datepickerInput() expects a string parameter');
            }

            options.datepickerInput = datepickerInput;
            return picker;
        };

        picker.parseInputDate = function (parseInputDate) {
            if (arguments.length === 0) {
                return options.parseInputDate;
            }

            if (typeof parseInputDate !== 'function') {
                throw new TypeError('parseInputDate() sholud be as function');
            }

            options.parseInputDate = parseInputDate;

            return picker;
        };

        picker.disabledTimeIntervals = function (disabledTimeIntervals) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledTimeIntervals">
            ///<summary>Returns an array with the currently set disabled dates on the component.</summary>
            ///<returns type="array">options.disabledTimeIntervals</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledDates if such exist.</summary>
            ///<param name="dates" locid="$.fn.datetimepicker.disabledTimeIntervals_p:dates">Takes an [ string or Date or moment ] of values and allows the user to select only from those days.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledTimeIntervals ? $.extend({}, options.disabledTimeIntervals) : options.disabledTimeIntervals);
            }

            if (!disabledTimeIntervals) {
                options.disabledTimeIntervals = false;
                update();
                return picker;
            }
            if (!(disabledTimeIntervals instanceof Array)) {
                throw new TypeError('disabledTimeIntervals() expects an array parameter');
            }
            options.disabledTimeIntervals = disabledTimeIntervals;
            update();
            return picker;
        };

        picker.disabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.disabledHours">
            ///<summary>Returns an array with the currently set disabled hours on the component.</summary>
            ///<returns type="array">options.disabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of
            ///options.enabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.disabledHours_p:hours">Takes an [ int ] of values and disallows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.disabledHours ? $.extend({}, options.disabledHours) : options.disabledHours);
            }

            if (!hours) {
                options.disabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('disabledHours() expects an array parameter');
            }
            options.disabledHours = indexGivenHours(hours);
            options.enabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.enabledHours = function (hours) {
            ///<signature helpKeyword="$.fn.datetimepicker.enabledHours">
            ///<summary>Returns an array with the currently set enabled hours on the component.</summary>
            ///<returns type="array">options.enabledHours</returns>
            ///</signature>
            ///<signature>
            ///<summary>Setting this takes precedence over options.minDate, options.maxDate configuration. Also calling this function removes the configuration of options.disabledHours if such exist.</summary>
            ///<param name="hours" locid="$.fn.datetimepicker.enabledHours_p:hours">Takes an [ int ] of values and allows the user to select only from those hours.</param>
            ///</signature>
            if (arguments.length === 0) {
                return (options.enabledHours ? $.extend({}, options.enabledHours) : options.enabledHours);
            }

            if (!hours) {
                options.enabledHours = false;
                update();
                return picker;
            }
            if (!(hours instanceof Array)) {
                throw new TypeError('enabledHours() expects an array parameter');
            }
            options.enabledHours = indexGivenHours(hours);
            options.disabledHours = false;
            if (options.useCurrent && !options.keepInvalid) {
                var tries = 0;
                while (!isValid(date, 'h')) {
                    date.add(1, 'h');
                    if (tries === 24) {
                        throw 'Tried 24 times to find a valid date';
                    }
                    tries++;
                }
                setValue(date);
            }
            update();
            return picker;
        };

        picker.viewDate = function (newDate) {
            ///<signature helpKeyword="$.fn.datetimepicker.viewDate">
            ///<summary>Returns the component's model current viewDate, a moment object or null if not set.</summary>
            ///<returns type="Moment">viewDate.clone()</returns>
            ///</signature>
            ///<signature>
            ///<summary>Sets the components model current moment to it. Passing a null value unsets the components model current moment. Parsing of the newDate parameter is made using moment library with the options.format and options.useStrict components configuration.</summary>
            ///<param name="newDate" locid="$.fn.datetimepicker.date_p:newDate">Takes string, viewDate, moment, null parameter.</param>
            ///</signature>
            if (arguments.length === 0) {
                return viewDate.clone();
            }

            if (!newDate) {
                viewDate = date.clone();
                return picker;
            }

            if (typeof newDate !== 'string' && !moment.isMoment(newDate) && !(newDate instanceof Date)) {
                throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
            }

            viewDate = parseInputDate(newDate);
            viewUpdate();
            return picker;
        };

        // initializing element and component attributes
        if (element.is('input')) {
            input = element;
        } else {
            input = element.find(options.datepickerInput);
            if (input.size() === 0) {
                input = element.find('input');
            } else if (!input.is('input')) {
                throw new Error('CSS class "' + options.datepickerInput + '" cannot be applied to non input element');
            }
        }

        if (element.hasClass('input-group')) {
            // in case there is more then one 'input-group-addon' Issue #48
            if (element.find('.datepickerbutton').size() === 0) {
                component = element.find('.input-group-addon');
            } else {
                component = element.find('.datepickerbutton');
            }
        }

        if (!options.inline && !input.is('input')) {
            throw new Error('Could not initialize DateTimePicker without an input element');
        }

        // Set defaults for date here now instead of in var declaration
        date = getMoment();
        viewDate = date.clone();

        $.extend(true, options, dataToOptions());

        picker.options(options);

        initFormatting();

        attachDatePickerElementEvents();

        if (input.prop('disabled')) {
            picker.disable();
        }
        if (input.is('input') && input.val().trim().length !== 0) {
            setValue(parseInputDate(input.val().trim()));
        }
        else if (options.defaultDate && input.attr('placeholder') === undefined) {
            setValue(options.defaultDate);
        }
        if (options.inline) {
            show();
        }
        return picker;
    };

    /********************************************************************************
     *
     * jQuery plugin constructor and defaults object
     *
     ********************************************************************************/

    $.fn.datetimepicker = function (options) {
        return this.each(function () {
            var $this = $(this);
            if (!$this.data('DateTimePicker')) {
                // create a private copy of the defaults object
                options = $.extend(true, {}, $.fn.datetimepicker.defaults, options);
                $this.data('DateTimePicker', dateTimePicker($this, options));
            }
        });
    };

    $.fn.datetimepicker.defaults = {
        timeZone: 'Etc/UTC',
        format: false,
        dayViewHeaderFormat: 'MMMM YYYY',
        extraFormats: false,
        stepping: 1,
        minDate: false,
        maxDate: false,
        useCurrent: true,
        collapse: true,
        locale: moment.locale(),
        defaultDate: false,
        disabledDates: false,
        enabledDates: false,
        icons: {
            time: 'glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        },
        tooltips: {
            today: 'Go to today',
            clear: 'Clear selection',
            close: 'Close the picker',
            selectMonth: 'Select Month',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            selectYear: 'Select Year',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            selectDecade: 'Select Decade',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevCentury: 'Previous Century',
            nextCentury: 'Next Century',
            pickHour: 'Pick Hour',
            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            pickMinute: 'Pick Minute',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            pickSecond: 'Pick Second',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            togglePeriod: 'Toggle Period',
            selectTime: 'Select Time'
        },
        useStrict: false,
        sideBySide: false,
        daysOfWeekDisabled: false,
        calendarWeeks: false,
        viewMode: 'days',
        toolbarPlacement: 'default',
        showTodayButton: false,
        showClear: false,
        showClose: false,
        widgetPositioning: {
            horizontal: 'auto',
            vertical: 'auto'
        },
        widgetParent: null,
        ignoreReadonly: false,
        keepOpen: false,
        focusOnShow: true,
        inline: false,
        keepInvalid: false,
        datepickerInput: '.datepickerinput',
        keyBinds: {
            up: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(7, 'd'));
                } else {
                    this.date(d.clone().add(this.stepping(), 'm'));
                }
            },
            down: function (widget) {
                if (!widget) {
                    this.show();
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(7, 'd'));
                } else {
                    this.date(d.clone().subtract(this.stepping(), 'm'));
                }
            },
            'control up': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'y'));
                } else {
                    this.date(d.clone().add(1, 'h'));
                }
            },
            'control down': function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'y'));
                } else {
                    this.date(d.clone().subtract(1, 'h'));
                }
            },
            left: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'd'));
                }
            },
            right: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'd'));
                }
            },
            pageUp: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().subtract(1, 'M'));
                }
            },
            pageDown: function (widget) {
                if (!widget) {
                    return;
                }
                var d = this.date() || this.getMoment();
                if (widget.find('.datepicker').is(':visible')) {
                    this.date(d.clone().add(1, 'M'));
                }
            },
            enter: function () {
                this.hide();
            },
            escape: function () {
                this.hide();
            },
            //tab: function (widget) { //this break the flow of the form. disabling for now
            //    var toggle = widget.find('.picker-switch a[data-action="togglePicker"]');
            //    if(toggle.length > 0) toggle.click();
            //},
            'control space': function (widget) {
                if (widget.find('.timepicker').is(':visible')) {
                    widget.find('.btn[data-action="togglePeriod"]').click();
                }
            },
            t: function () {
                this.date(this.getMoment());
            },
            'delete': function () {
                this.clear();
            }
        },
        debug: false,
        allowInputToggle: false,
        disabledTimeIntervals: false,
        disabledHours: false,
        enabledHours: false,
        viewDate: false
    };
}));
/**
 * pickList
 */
(function ($) {

    $.fn.pickList = function (options) {

        var opts = $.extend({}, $.fn.pickList.defaults, options);

        this.fill = function () {
            var option = '';

            $.each(opts.data, function (key, val) {
                option += '<option id=' + val.id + '>' + val.text + '</option>';
            });
            this.find('#pickData').append(option);
        };
        this.controll = function () {
            var pickThis = this;

            $("#pAdd").on('click', function () {
                var p = pickThis.find("#pickData option:selected");
                p.clone().appendTo("#pickListResult");
                p.remove();
            });

            $("#pAddAll").on('click', function () {
                var p = pickThis.find("#pickData option");
                p.clone().appendTo("#pickListResult");
                p.remove();
            });

            $("#pRemove").on('click', function () {
                var p = pickThis.find("#pickListResult option:selected");
                p.clone().appendTo("#pickData");
                p.remove();
            });

            $("#pRemoveAll").on('click', function () {
                var p = pickThis.find("#pickListResult option");
                p.clone().appendTo("#pickData");
                p.remove();
            });
        };
        this.getValues = function () {
            var objResult = [];
            this.find("#pickListResult option").each(function () {
                objResult.push({id: this.id, text: this.text});
            });
            return objResult;
        };
        this.init = function () {
            var pickListHtml =
                "<div class='row'>" +
                "  <div class='col-sm-5'>" +
                "	 <select class='form-control pickListSelect' id='pickData' multiple></select>" +
                " </div>" +
                " <div class='col-sm-2 pickListButtons'>" +
                "	<button id='pAdd' class='btn btn-primary btn-sm'>" + opts.add + "</button>" +
                "      <button id='pAddAll' class='btn btn-primary btn-sm'>" + opts.addAll + "</button>" +
                "	<button id='pRemove' class='btn btn-primary btn-sm'>" + opts.remove + "</button>" +
                "	<button id='pRemoveAll' class='btn btn-primary btn-sm'>" + opts.removeAll + "</button>" +
                " </div>" +
                " <div class='col-sm-5'>" +
                "    <select class='form-control pickListSelect' id='pickListResult' multiple></select>" +
                " </div>" +
                "</div>";

            this.append(pickListHtml);

            this.fill();
            this.controll();
        };

        this.init();
        return this;
    };

    $.fn.pickList.defaults = {
        add: 'Add',
        addAll: 'Add All',
        remove: 'Remove',
        removeAll: 'Remove All'
    };


}(jQuery));
/*!
 * Select2 4.0.2
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =
(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
        var superMethod = superMethods[m];

        DecoratedClass.prototype[superMethod] =
          SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;

    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="tree"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="treeitem" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = $.data(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

      var $selected = $options.filter('[aria-selected=true]');

      // Check if there are any selected options
      if ($selected.length > 0) {
        // If there are selected options, highlight the first
        $selected.first().trigger('mouseenter');
      } else {
        // If there are no selected options, highlight the first option
        // in the dropdown
        $options.first().trigger('mouseenter');
      }
    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'treeitem',
      'aria-selected': 'false'
    };

    if (data.disabled) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    $.data(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = $highlighted.data('data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at te top, don't move further
      if (currentIndex === 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = $this.data('data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = $(this).data('data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (this.$element.data('old-tabindex') != null) {
      this._tabindex = this.$element.data('old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-container';
    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.focus();

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {
    var self = this;

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        var $this = $(this);

        if (this == $select[0]) {
          return;
        }

        var $element = $this.data('element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered').attr('id', id);
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });
  };

  SingleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);
    $rendered.prop('title', selection.title || selection.text);
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.options.get('disabled')) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = $selection.data('data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);
      $selection.prop('title', selection.title || selection.text);

      $selection.data('data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys'
], function ($, KEYS) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.options.get('disabled')) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = $clear.data('data');

    for (var d = 0; d < data.length; d++) {
      var unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        return;
      }
    }

    this.$element.val(this.placeholder.id).trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var $remove = $(
      '<span class="select2-selection__clear">' +
        '&times;' +
      '</span>'
    );
    $remove.data('data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      self.$search.attr('aria-activedescendant', params.id);
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = $previousChoice.data('data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      this.$search.focus();
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').innerWidth();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting'
    ];

    var preventableEvents = ['opening', 'closing', 'selecting', 'unselecting'];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      $.removeData(this, 'data');
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    $.data(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = $.data($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    $.data($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (!$.isPlainObject(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    var data = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);

    this.addOptions(this.convertToOptions(data));
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term !== '') {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var checkText = option.text === params.term;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var tag = this._lastTag;

    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, select);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.focus();
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }
        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implmented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="off"' +
        ' spellcheck="false" role="textbox" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);

      self.$search.focus();

      window.setTimeout(function () {
        self.$search.focus();
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);

      self.$search.val('');
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore();
      }
    });
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="treeitem" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = options.get('dropdownParent') || $(document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var setupResultsEvents = false;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      if (!setupResultsEvents) {
        setupResultsEvents = true;

        container.on('results:all', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });

        container.on('results:append', function () {
          self._positionDropdown();
          self._resizeDropdown();
        });
      }
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      $(this).data('select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = $(this).data('select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[

], function () {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function () {
      self._handleSelectOnClose();
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function () {
    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = $highlightedResults.data('data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && originalEvent.ctrlKey) {
      return;
    }

    this.trigger('close', {});
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    if (typeof options.language === 'string') {
      // Check if the language is specified with a region
      if (options.language.indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = options.language.split('-');
        var baseLanguage = languageParts[0];

        options.language = [options.language, baseLanguage];
      } else {
        options.language = [options.language];
      }
    }

    if ($.isArray(options.language)) {
      var languages = new Translation();
      options.language.push('en');

      var languageNames = options.language;

      for (var l = 0; l < languageNames.length; l++) {
        var name = languageNames[l];
        var language = {};

        try {
          // Try to load it with the original name
          language = Translation.loadPath(name);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            name = this.defaults.amdLanguageBase + name;
            language = Translation.loadPath(name);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files.
            if (options.debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + name + '" could not be ' +
                'automatically loaded. A fallback will be used instead.'
              );
            }

            continue;
          }
        }

        languages.extend(language);
      }

      options.translations = languages;
    } else {
      var baseTranslation = Translation.loadPath(
        this.defaults.amdLanguageBase + 'en'
      );
      var customTranslation = new Translation(options.language);

      customTranslation.extend(baseTranslation);

      options.translations = customTranslation;
    }

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: EnglishTranslation,
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.language == null) {
      if ($e.prop('lang')) {
        this.options.language = $e.prop('lang').toLowerCase();
      } else if ($e.closest('[lang]').prop('lang')) {
        this.options.language = $e.closest('[lang]').prop('lang');
      }
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if ($e.data('select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      $e.data('data', $e.data('select2Tags'));
      $e.data('tags', true);
    }

    if ($e.data('ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', $e.data('ajaxUrl'));
      $e.data('ajax--url', $e.data('ajaxUrl'));
    }

    var dataset = {};

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, $e.data());
    } else {
      dataset = $e.data();
    }

    var data = $.extend(true, {}, dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if ($element.data('select2') != null) {
      $element.data('select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    $element.data('old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this._sync = Utils.bind(this._syncAttributes, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._sync);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        $.each(mutations, self._sync);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener('DOMAttrModified', self._sync, false);
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close();

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.options.get('disabled')) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.options.get('disabled')) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function () {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', {});
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._sync);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._sync, false);
    }

    this._sync = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex', this.$element.data('old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    $container.data('element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery-mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults'
], function ($, _, Select2, Defaults) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;

        this.each(function () {
          var instance = $(this).data('select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          var args = Array.prototype.slice.call(arguments, 1);

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));

"use strict";

(function ($) {

    $.fn.circliful = function (options, callback) {

        var settings = $.extend({
            // These are the defaults.
            //startDegree: 0,
            foregroundColor: "#3498DB",
            backgroundColor: "#ccc",
            pointColor: "none",
            fillColor: 'none',
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            pointSize: 28.5,
            fontColor: '#aaa',
            percent: 75,
            animation: 1,
            animationStep: 5,
            icon: 'none',
            iconSize: '30',
            iconColor: '#ccc',
            iconPosition: 'top',
            target: 0,
            start: 0,
            showPercent: 1,
            percentageTextSize: 22,
            textAdditionalCss: '',
            targetPercent: 0,
            targetTextSize: 17,
            targetColor: '#2980B9',
            text: null,
            textStyle: null,
            textColor: '#666',
            multiPercentage: 0,
            percentages: null
        }, options);

        return this.each(function () {
            var circleContainer = $(this);
            var percent = settings.percent;
            var iconY = 83;
            var iconX = 100;
            var textY = 110;
            var textX = 100;
            var additionalCss;
            var elements;
            var icon;
            var backgroundBorderWidth = settings.backgroundBorderWidth;

            if(settings.iconPosition == 'bottom') {
                iconY = 124;
                textY = 95;
            } else if(settings.iconPosition == 'left') {
                iconX = 80;
                iconY = 110;
                textX = 117;
            } else if(settings.iconPosition == 'middle') {
                if(settings.multiPercentage == 1) {console.log(typeof settings.percentages == "object")
                    if(typeof settings.percentages == "object") {
                        backgroundBorderWidth = 30;
                    } else {
                        iconY = 110;
                        elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
                        elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
                        textX = 228;
                        textY = 47;
                    }
                } else {
                    iconY = 110;
                    elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="133" y1="50" x2="140" y2="40" stroke-width="2"  /></g>';
                    elements += '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="140" y1="40" x2="200" y2="40" stroke-width="2"  /></g>';
                    textX = 175;
                    textY = 35;
                }
            } else if(settings.iconPosition == 'right') {
                iconX = 120;
                iconY = 110;
                textX = 80;
            }

            if(settings.targetPercent > 0) {
                textY = 95;
                elements = '<g stroke="' + (settings.backgroundColor != 'none' ? settings.backgroundColor : '#ccc') + '" ><line x1="75" y1="101" x2="125" y2="101" stroke-width="1"  /></g>';
                elements += '<text text-anchor="middle" x="' + textX + '" y="120" style="font-size: ' + settings.targetTextSize + 'px;" fill="' + settings.targetColor + '">' + settings.targetPercent + '%</text>';
                elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.backgroundColor + '" stroke-width="3" stroke-dasharray="450" transform="rotate(-90,100,100)" />';
                elements += '<circle cx="100" cy="100" r="69" fill="none" stroke="' + settings.targetColor + '" stroke-width="3" stroke-dasharray="' + (360 / 100 * settings.targetPercent) + ', 20000" transform="rotate(-90,100,100)" />';

            }

            if(settings.text != null && settings.multiPercentage == 0) {
                elements += '<text text-anchor="middle" x="100" y="125" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
            } else if(settings.text != null && settings.multiPercentage == 1) {
                elements += '<text text-anchor="middle" x="228" y="65" style="' + settings.textStyle + '" fill="' + settings.textColor + '">' + settings.text + '</text>';
            }

            if (settings.icon != 'none') {
                icon = '<text text-anchor="middle" x="' + iconX + '" y="' + iconY + '" class="icon" style="font-size: ' + settings.iconSize + 'px" fill="' + settings.iconColor + '">&#x' + settings.icon + '</text>';
            }

            circleContainer
                .addClass('svg-container')
                .append(
                    $('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 194 186" class="circliful">' +
                        elements +
                        '<circle cx="100" cy="100" r="57" class="border" fill="' + settings.fillColor + '" stroke="' + settings.backgroundColor + '" stroke-width="' + backgroundBorderWidth + '" stroke-dasharray="360" transform="rotate(-90,100,100)" />' +
                        '<circle class="circle" cx="100" cy="100" r="57" class="border" fill="none" stroke="' + settings.foregroundColor + '" stroke-width="' + settings.foregroundBorderWidth + '" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" />' +
                        '<circle cx="100" cy="100" r="' + settings.pointSize + '" fill="' + settings.pointColor + '" />' +
                        icon +
                        '<text class="timer" text-anchor="middle" x="' + textX + '" y="' + textY + '" style="font-size: ' + settings.percentageTextSize + 'px; ' + additionalCss + ';' + settings.textAdditionalCss + '" fill="' + settings.fontColor + '">0%</text>')
                );

            var circle = circleContainer.find('.circle');
            var myTimer = circleContainer.find('.timer');
            var interval = 30;
            var angle = 0;
            var angleIncrement = settings.animationStep;
            var last = 0;
            var summary = 0;
            var oneStep = 0;

            if (settings.start > 0 && settings.target > 0) {
                percent = settings.start / (settings.target / 100);
                oneStep = settings.target / 100;
            }

            if (settings.animation == 1) {
                var timer = window.setInterval(function () {
                    if ((angle) >= (360 / 100 * percent)) {
                        window.clearInterval(timer);
                        last = 1;
                    } else {
                        angle += angleIncrement;
                        summary += oneStep;
                    }

                    if (angle / 3.6 >= percent && last == 1) {
                        angle = 3.6 * percent;
                    }

                    if (summary > settings.target && last == 1) {
                        summary = settings.target;
                    }

                    circle
                        .attr("stroke-dasharray", angle + ", 20000");

                    if (settings.showPercent == 1) {
                        myTimer
                            .text(parseInt(angle / 360 * 100) + '%');
                    } else {
                        myTimer
                            .text(summary);
                    }

                }.bind(circle), interval);
            } else {
                circle
                    .attr("stroke-dasharray", (360 / 100 * percent) + ", 20000");

                if (settings.showPercent == 1) {
                    myTimer
                        .text(percent + '%');
                } else {
                    myTimer
                        .text(settings.target);
                }
            }
        });
    }

}(jQuery));
/*! X-editable - v1.5.0
 * In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery
 * http://github.com/vitalets/x-editable
 * Copyright (c) 2013 Vitaliy Potapov; Licensed MIT */
/**
 Form with single input element, two buttons and two states: normal/loading.
 Applied as jQuery method to DIV tag (not to form tag!). This is because form can be in loading state when spinner shown.
 Editableform is linked with one of input types, e.g. 'text', 'select' etc.

 @class editableform
 @uses text
 @uses textarea
 **/
(function ($) {
    "use strict";

    var EditableForm = function (div, options) {
        this.options = $.extend({}, $.fn.editableform.defaults, options);
        this.$div = $(div); //div, containing form. Not form tag. Not editable-element.
        if(!this.options.scope) {
            this.options.scope = this;
        }
        //nothing shown after init
    };

    EditableForm.prototype = {
        constructor: EditableForm,
        initInput: function() {  //called once
            //take input from options (as it is created in editable-element)
            this.input = this.options.input;

            //set initial value
            //todo: may be add check: typeof str === 'string' ?
            this.value = this.input.str2value(this.options.value);

            //prerender: get input.$input
            this.input.prerender();
        },
        initTemplate: function() {
            this.$form = $($.fn.editableform.template);
        },
        initButtons: function() {
            var $btn = this.$form.find('.editable-buttons');
            $btn.append($.fn.editableform.buttons);
            if(this.options.showbuttons === 'bottom') {
                $btn.addClass('editable-buttons-bottom');
            }
        },
        /**
         Renders editableform

         @method render
         **/
        render: function() {
            //init loader
            this.$loading = $($.fn.editableform.loading);
            this.$div.empty().append(this.$loading);

            //init form template and buttons
            this.initTemplate();
            if(this.options.showbuttons) {
                this.initButtons();
            } else {
                this.$form.find('.editable-buttons').remove();
            }

            //show loading state
            this.showLoading();

            //flag showing is form now saving value to server.
            //It is needed to wait when closing form.
            this.isSaving = false;

            /**
             Fired when rendering starts
             @event rendering
             @param {Object} event event object
             **/
            this.$div.triggerHandler('rendering');

            //init input
            this.initInput();

            //append input to form
            this.$form.find('div.editable-input').append(this.input.$tpl);

            //append form to container
            this.$div.append(this.$form);

            //render input
            $.when(this.input.render())
                .then($.proxy(function () {
                    //setup input to submit automatically when no buttons shown
                    if(!this.options.showbuttons) {
                        this.input.autosubmit();
                    }

                    //attach 'cancel' handler
                    this.$form.find('.editable-cancel').click($.proxy(this.cancel, this));

                    if(this.input.error) {
                        this.error(this.input.error);
                        this.$form.find('.editable-submit').attr('disabled', true);
                        this.input.$input.attr('disabled', true);
                        //prevent form from submitting
                        this.$form.submit(function(e){ e.preventDefault(); });
                    } else {
                        this.error(false);
                        this.input.$input.removeAttr('disabled');
                        this.$form.find('.editable-submit').removeAttr('disabled');
                        var value = (this.value === null || this.value === undefined || this.value === '') ? this.options.defaultValue : this.value;
                        this.input.value2input(value);
                        //attach submit handler
                        this.$form.submit($.proxy(this.submit, this));
                    }

                    /**
                     Fired when form is rendered
                     @event rendered
                     @param {Object} event event object
                     **/
                    this.$div.triggerHandler('rendered');

                    this.showForm();

                    //call postrender method to perform actions required visibility of form
                    if(this.input.postrender) {
                        this.input.postrender();
                    }
                }, this));
        },
        cancel: function() {
            /**
             Fired when form was cancelled by user
             @event cancel
             @param {Object} event event object
             **/
            this.$div.triggerHandler('cancel');
        },
        showLoading: function() {
            var w, h;
            if(this.$form) {
                //set loading size equal to form
                w = this.$form.outerWidth();
                h = this.$form.outerHeight();
                if(w) {
                    this.$loading.width(w);
                }
                if(h) {
                    this.$loading.height(h);
                }
                this.$form.hide();
            } else {
                //stretch loading to fill container width
                w = this.$loading.parent().width();
                if(w) {
                    this.$loading.width(w);
                }
            }
            this.$loading.show();
        },

        showForm: function(activate) {
            this.$loading.hide();
            this.$form.show();
            if(activate !== false) {
                this.input.activate();
            }
            /**
             Fired when form is shown
             @event show
             @param {Object} event event object
             **/
            this.$div.triggerHandler('show');
        },

        error: function(msg) {
            var $group = this.$form.find('.control-group'),
                $block = this.$form.find('.editable-error-block'),
                lines;

            if(msg === false) {
                $group.removeClass($.fn.editableform.errorGroupClass);
                $block.removeClass($.fn.editableform.errorBlockClass).empty().hide();
            } else {
                //convert newline to <br> for more pretty error display
                if(msg) {
                    lines = msg.split("\n");
                    for (var i = 0; i < lines.length; i++) {
                        lines[i] = $('<div>').text(lines[i]).html();
                    }
                    msg = lines.join('<br>');
                }
                $group.addClass($.fn.editableform.errorGroupClass);
                $block.addClass($.fn.editableform.errorBlockClass).html(msg).show();
            }
        },

        submit: function(e) {
            e.stopPropagation();
            e.preventDefault();

            var error,
                newValue = this.input.input2value(); //get new value from input

            //validation
            if (error = this.validate(newValue)) {
                this.error(error);
                this.showForm();
                return;
            }

            //if value not changed --> trigger 'nochange' event and return
            /*jslint eqeq: true*/
            if (!this.options.savenochange && this.input.value2str(newValue) == this.input.value2str(this.value)) {
                /*jslint eqeq: false*/
                /**
                 Fired when value not changed but form is submitted. Requires savenochange = false.
                 @event nochange
                 @param {Object} event event object
                 **/
                this.$div.triggerHandler('nochange');
                return;
            }

            //convert value for submitting to server
            var submitValue = this.input.value2submit(newValue);

            this.isSaving = true;

            //sending data to server
            $.when(this.save(submitValue))
                .done($.proxy(function(response) {
                    this.isSaving = false;

                    //run success callback
                    var res = typeof this.options.success === 'function' ? this.options.success.call(this.options.scope, response, newValue) : null;

                    //if success callback returns false --> keep form open and do not activate input
                    if(res === false) {
                        this.error(false);
                        this.showForm(false);
                        return;
                    }

                    //if success callback returns string -->  keep form open, show error and activate input
                    if(typeof res === 'string') {
                        this.error(res);
                        this.showForm();
                        return;
                    }

                    //if success callback returns object like {newValue: <something>} --> use that value instead of submitted
                    //it is usefull if you want to chnage value in url-function
                    if(res && typeof res === 'object' && res.hasOwnProperty('newValue')) {
                        newValue = res.newValue;
                    }

                    //clear error message
                    this.error(false);
                    this.value = newValue;
                    /**
                     Fired when form is submitted
                     @event save
                     @param {Object} event event object
                     @param {Object} params additional params
                     @param {mixed} params.newValue raw new value
                     @param {mixed} params.submitValue submitted value as string
                     @param {Object} params.response ajax response

                     @example
                     $('#form-div').on('save'), function(e, params){
                    if(params.newValue === 'username') {...}
                });
                     **/
                    this.$div.triggerHandler('save', {newValue: newValue, submitValue: submitValue, response: response});
                }, this))
                .fail($.proxy(function(xhr) {
                    this.isSaving = false;

                    var msg;
                    if(typeof this.options.error === 'function') {
                        msg = this.options.error.call(this.options.scope, xhr, newValue);
                    } else {
                        msg = typeof xhr === 'string' ? xhr : xhr.responseText || xhr.statusText || 'Unknown error!';
                    }

                    this.error(msg);
                    this.showForm();
                }, this));
        },

        save: function(submitValue) {
            //try parse composite pk defined as json string in data-pk
            this.options.pk = $.fn.editableutils.tryParseJson(this.options.pk, true);

            var pk = (typeof this.options.pk === 'function') ? this.options.pk.call(this.options.scope) : this.options.pk,
            /*
             send on server in following cases:
             1. url is function
             2. url is string AND (pk defined OR send option = always)
             */
                send = !!(typeof this.options.url === 'function' || (this.options.url && ((this.options.send === 'always') || (this.options.send === 'auto' && pk !== null && pk !== undefined)))),
                params;

            if (send) { //send to server
                this.showLoading();

                //standard params
                params = {
                    name: this.options.name || '',
                    value: submitValue,
                    pk: pk
                };

                //additional params
                if(typeof this.options.params === 'function') {
                    params = this.options.params.call(this.options.scope, params);
                } else {
                    //try parse json in single quotes (from data-params attribute)
                    this.options.params = $.fn.editableutils.tryParseJson(this.options.params, true);
                    $.extend(params, this.options.params);
                }

                if(typeof this.options.url === 'function') { //user's function
                    return this.options.url.call(this.options.scope, params);
                } else {
                    //send ajax to server and return deferred object
                    return $.ajax($.extend({
                        url     : this.options.url,
                        data    : params,
                        type    : 'POST'
                    }, this.options.ajaxOptions));
                }
            }
        },

        validate: function (value) {
            if (value === undefined) {
                value = this.value;
            }
            if (typeof this.options.validate === 'function') {
                return this.options.validate.call(this.options.scope, value);
            }
        },

        option: function(key, value) {
            if(key in this.options) {
                this.options[key] = value;
            }

            if(key === 'value') {
                this.setValue(value);
            }

            //do not pass option to input as it is passed in editable-element
        },

        setValue: function(value, convertStr) {
            if(convertStr) {
                this.value = this.input.str2value(value);
            } else {
                this.value = value;
            }

            //if form is visible, update input
            if(this.$form && this.$form.is(':visible')) {
                this.input.value2input(this.value);
            }
        }
    };

    /*
     Initialize editableform. Applied to jQuery object.

     @method $().editableform(options)
     @params {Object} options
     @example
     var $form = $('&lt;div&gt;').editableform({
     type: 'text',
     name: 'username',
     url: '/post',
     value: 'vitaliy'
     });

     //to display form you should call 'render' method
     $form.editableform('render');
     */
    $.fn.editableform = function (option) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this),
                data = $this.data('editableform'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('editableform', (data = new EditableForm(this, options)));
            }

            if (typeof option === 'string') { //call method
                data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });
    };

    //keep link to constructor to allow inheritance
    $.fn.editableform.Constructor = EditableForm;

    //defaults
    $.fn.editableform.defaults = {
        /* see also defaults for input */

        /**
         Type of input. Can be <code>text|textarea|select|date|checklist</code>

         @property type
         @type string
         @default 'text'
         **/
        type: 'text',
        /**
         Url for submit, e.g. <code>'/post'</code>
         If function - it will be called instead of ajax. Function should return deferred object to run fail/done callbacks.

         @property url
         @type string|function
         @default null
         @example
         url: function(params) {
            var d = new $.Deferred;
            if(params.value === 'abc') {
                return d.reject('error message'); //returning error via deferred object
            } else {
                //async saving data in js model
                someModel.asyncSaveMethod({
                   ...,
                   success: function(){
                      d.resolve();
                   }
                });
                return d.promise();
            }
        }
         **/
        url:null,
        /**
         Additional params for submit. If defined as <code>object</code> - it is **appended** to original ajax data (pk, name and value).
         If defined as <code>function</code> - returned object **overwrites** original ajax data.
         @example
         params: function(params) {
            //originally params contain pk, name and value
            params.a = 1;
            return params;
        }

         @property params
         @type object|function
         @default null
         **/
        params:null,
        /**
         Name of field. Will be submitted on server. Can be taken from <code>id</code> attribute

         @property name
         @type string
         @default null
         **/
        name: null,
        /**
         Primary key of editable object (e.g. record id in database). For composite keys use object, e.g. <code>{id: 1, lang: 'en'}</code>.
         Can be calculated dynamically via function.

         @property pk
         @type string|object|function
         @default null
         **/
        pk: null,
        /**
         Initial value. If not defined - will be taken from element's content.
         For __select__ type should be defined (as it is ID of shown text).

         @property value
         @type string|object
         @default null
         **/
        value: null,
        /**
         Value that will be displayed in input if original field value is empty (`null|undefined|''`).

         @property defaultValue
         @type string|object
         @default null
         @since 1.4.6
         **/
        defaultValue: null,
        /**
         Strategy for sending data on server. Can be `auto|always|never`.
         When 'auto' data will be sent on server **only if pk and url defined**, otherwise new value will be stored locally.

         @property send
         @type string
         @default 'auto'
         **/
        send: 'auto',
        /**
         Function for client-side validation. If returns string - means validation not passed and string showed as error.

         @property validate
         @type function
         @default null
         @example
         validate: function(value) {
            if($.trim(value) == '') {
                return 'This field is required';
            }
        }
         **/
        validate: null,
        /**
         Success callback. Called when value successfully sent on server and **response status = 200**.
         Usefull to work with json response. For example, if your backend response can be <code>{success: true}</code>
         or <code>{success: false, msg: "server error"}</code> you can check it inside this callback.
         If it returns **string** - means error occured and string is shown as error message.
         If it returns **object like** <code>{newValue: &lt;something&gt;}</code> - it overwrites value, submitted by user.
         Otherwise newValue simply rendered into element.

         @property success
         @type function
         @default null
         @example
         success: function(response, newValue) {
            if(!response.success) return response.msg;
        }
         **/
        success: null,
        /**
         Error callback. Called when request failed (response status != 200).
         Usefull when you want to parse error response and display a custom message.
         Must return **string** - the message to be displayed in the error block.

         @property error
         @type function
         @default null
         @since 1.4.4
         @example
         error: function(response, newValue) {
            if(response.status === 500) {
                return 'Service unavailable. Please try later.';
            } else {
                return response.responseText;
            }
        }
         **/
        error: null,
        /**
         Additional options for submit ajax request.
         List of values: http://api.jquery.com/jQuery.ajax

         @property ajaxOptions
         @type object
         @default null
         @since 1.1.1
         @example
         ajaxOptions: {
            type: 'put',
            dataType: 'json'
        }
         **/
        ajaxOptions: null,
        /**
         Where to show buttons: left(true)|bottom|false
         Form without buttons is auto-submitted.

         @property showbuttons
         @type boolean|string
         @default true
         @since 1.1.1
         **/
        showbuttons: true,
        /**
         Scope for callback methods (success, validate).
         If <code>null</code> means editableform instance itself.

         @property scope
         @type DOMElement|object
         @default null
         @since 1.2.0
         @private
         **/
        scope: null,
        /**
         Whether to save or cancel value when it was not changed but form was submitted

         @property savenochange
         @type boolean
         @default false
         @since 1.2.0
         **/
        savenochange: false
    };

    /*
     Note: following params could redefined in engine: bootstrap or jqueryui:
     Classes 'control-group' and 'editable-error-block' must always present!
     */
    $.fn.editableform.template = '<form class="form-inline editableform">'+
        '<div class="control-group">' +
        '<div><div class="editable-input"></div><div class="editable-buttons"></div></div>'+
        '<div class="editable-error-block"></div>' +
        '</div>' +
        '</form>';

    //loading div
    $.fn.editableform.loading = '<div class="editableform-loading"></div>';

    //buttons
    $.fn.editableform.buttons = '<button type="submit" class="editable-submit">ok</button>'+
        '<button type="button" class="editable-cancel">cancel</button>';

    //error class attached to control-group
    $.fn.editableform.errorGroupClass = null;

    //error class attached to editable-error-block
    $.fn.editableform.errorBlockClass = 'editable-error';

    //engine
    $.fn.editableform.engine = 'jquery';
}(window.jQuery));

/**
 * EditableForm utilites
 */
(function ($) {
    "use strict";

    //utils
    $.fn.editableutils = {
        /**
         * classic JS inheritance function
         */
        inherit: function (Child, Parent) {
            var F = function() { };
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
            Child.superclass = Parent.prototype;
        },

        /**
         * set caret position in input
         * see http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
         */
        setCursorPosition: function(elem, pos) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },

        /**
         * function to parse JSON in *single* quotes. (jquery automatically parse only double quotes)
         * That allows such code as: <a data-source="{'a': 'b', 'c': 'd'}">
         * safe = true --> means no exception will be thrown
         * for details see http://stackoverflow.com/questions/7410348/how-to-set-json-format-to-html5-data-attributes-in-the-jquery
         */
        tryParseJson: function(s, safe) {
            if (typeof s === 'string' && s.length && s.match(/^[\{\[].*[\}\]]$/)) {
                if (safe) {
                    try {
                        /*jslint evil: true*/
                        s = (new Function('return ' + s))();
                        /*jslint evil: false*/
                    } catch (e) {} finally {
                        return s;
                    }
                } else {
                    /*jslint evil: true*/
                    s = (new Function('return ' + s))();
                    /*jslint evil: false*/
                }
            }
            return s;
        },

        /**
         * slice object by specified keys
         */
        sliceObj: function(obj, keys, caseSensitive /* default: false */) {
            var key, keyLower, newObj = {};

            if (!$.isArray(keys) || !keys.length) {
                return newObj;
            }

            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }

                if(caseSensitive === true) {
                    continue;
                }

                //when getting data-* attributes via $.data() it's converted to lowercase.
                //details: http://stackoverflow.com/questions/7602565/using-data-attributes-with-jquery
                //workaround is code below.
                keyLower = key.toLowerCase();
                if (obj.hasOwnProperty(keyLower)) {
                    newObj[key] = obj[keyLower];
                }
            }

            return newObj;
        },

        /*
         exclude complex objects from $.data() before pass to config
         */
        getConfigData: function($element) {
            var data = {};
            $.each($element.data(), function(k, v) {
                if(typeof v !== 'object' || (v && typeof v === 'object' && (v.constructor === Object || v.constructor === Array))) {
                    data[k] = v;
                }
            });
            return data;
        },

        /*
         returns keys of object
         */
        objectKeys: function(o) {
            if (Object.keys) {
                return Object.keys(o);
            } else {
                if (o !== Object(o)) {
                    throw new TypeError('Object.keys called on a non-object');
                }
                var k=[], p;
                for (p in o) {
                    if (Object.prototype.hasOwnProperty.call(o,p)) {
                        k.push(p);
                    }
                }
                return k;
            }

        },

        /**
         method to escape html.
         **/
        escape: function(str) {
            return $('<div>').text(str).html();
        },

        /*
         returns array items from sourceData having value property equal or inArray of 'value'
         */
        itemsByValue: function(value, sourceData, valueProp) {
            if(!sourceData || value === null) {
                return [];
            }

            if (typeof(valueProp) !== "function") {
                var idKey = valueProp || 'value';
                valueProp = function (e) { return e[idKey]; };
            }

            var isValArray = $.isArray(value),
                result = [],
                that = this;

            $.each(sourceData, function(i, o) {
                if(o.children) {
                    result = result.concat(that.itemsByValue(value, o.children, valueProp));
                } else {
                    /*jslint eqeq: true*/
                    if(isValArray) {
                        if($.grep(value, function(v){  return v == (o && typeof o === 'object' ? valueProp(o) : o); }).length) {
                            result.push(o);
                        }
                    } else {
                        var itemValue = (o && (typeof o === 'object')) ? valueProp(o) : o;
                        if(value == itemValue) {
                            result.push(o);
                        }
                    }
                    /*jslint eqeq: false*/
                }
            });

            return result;
        },

        /*
         Returns input by options: type, mode.
         */
        createInput: function(options) {
            var TypeConstructor, typeOptions, input,
                type = options.type;

            //`date` is some kind of virtual type that is transformed to one of exact types
            //depending on mode and core lib
            if(type === 'date') {
                //inline
                if(options.mode === 'inline') {
                    if($.fn.editabletypes.datefield) {
                        type = 'datefield';
                    } else if($.fn.editabletypes.dateuifield) {
                        type = 'dateuifield';
                    }
                    //popup
                } else {
                    if($.fn.editabletypes.date) {
                        type = 'date';
                    } else if($.fn.editabletypes.dateui) {
                        type = 'dateui';
                    }
                }

                //if type still `date` and not exist in types, replace with `combodate` that is base input
                if(type === 'date' && !$.fn.editabletypes.date) {
                    type = 'combodate';
                }
            }

            //`datetime` should be datetimefield in 'inline' mode
            if(type === 'datetime' && options.mode === 'inline') {
                type = 'datetimefield';
            }

            //change wysihtml5 to textarea for jquery UI and plain versions
            if(type === 'wysihtml5' && !$.fn.editabletypes[type]) {
                type = 'textarea';
            }

            //create input of specified type. Input will be used for converting value, not in form
            if(typeof $.fn.editabletypes[type] === 'function') {
                TypeConstructor = $.fn.editabletypes[type];
                typeOptions = this.sliceObj(options, this.objectKeys(TypeConstructor.defaults));
                input = new TypeConstructor(typeOptions);
                return input;
            } else {
                $.error('Unknown type: '+ type);
                return false;
            }
        },

        //see http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
        supportsTransitions: function () {
            var b = document.body || document.documentElement,
                s = b.style,
                p = 'transition',
                v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

            if(typeof s[p] === 'string') {
                return true;
            }

            // Tests for vendor specific prop
            p = p.charAt(0).toUpperCase() + p.substr(1);
            for(var i=0; i<v.length; i++) {
                if(typeof s[v[i] + p] === 'string') {
                    return true;
                }
            }
            return false;
        }

    };
}(window.jQuery));

/**
 Attaches stand-alone container with editable-form to HTML element. Element is used only for positioning, value is not stored anywhere.<br>
 This method applied internally in <code>$().editable()</code>. You should subscribe on it's events (save / cancel) to get profit of it.<br>
 Final realization can be different: bootstrap-popover, jqueryui-tooltip, poshytip, inline-div. It depends on which js file you include.<br>
 Applied as jQuery method.

 @class editableContainer
 @uses editableform
 **/
(function ($) {
    "use strict";

    var Popup = function (element, options) {
        this.init(element, options);
    };

    var Inline = function (element, options) {
        this.init(element, options);
    };

    //methods
    Popup.prototype = {
        containerName: null, //method to call container on element
        containerDataName: null, //object name in element's .data()
        innerCss: null, //tbd in child class
        containerClass: 'editable-container editable-popup', //css class applied to container element
        defaults: {}, //container itself defaults

        init: function(element, options) {
            this.$element = $(element);
            //since 1.4.1 container do not use data-* directly as they already merged into options.
            this.options = $.extend({}, $.fn.editableContainer.defaults, options);
            this.splitOptions();

            //set scope of form callbacks to element
            this.formOptions.scope = this.$element[0];

            this.initContainer();

            //flag to hide container, when saving value will finish
            this.delayedHide = false;

            //bind 'destroyed' listener to destroy container when element is removed from dom
            this.$element.on('destroyed', $.proxy(function(){
                this.destroy();
            }, this));

            //attach document handler to close containers on click / escape
            if(!$(document).data('editable-handlers-attached')) {
                //close all on escape
                $(document).on('keyup.editable', function (e) {
                    if (e.which === 27) {
                        $('.editable-open').editableContainer('hide');
                        //todo: return focus on element
                    }
                });

                //close containers when click outside
                //(mousedown could be better than click, it closes everything also on drag drop)
                $(document).on('click.editable', function(e) {
                    var $target = $(e.target), i,
                        exclude_classes = ['.editable-container',
                            '.ui-datepicker-header',
                            '.datepicker', //in inline mode datepicker is rendered into body
                            '.modal-backdrop',
                            '.bootstrap-wysihtml5-insert-image-modal',
                            '.bootstrap-wysihtml5-insert-link-modal'
                        ];

                    //check if element is detached. It occurs when clicking in bootstrap datepicker
                    if (!$.contains(document.documentElement, e.target)) {
                        return;
                    }

                    //for some reason FF 20 generates extra event (click) in select2 widget with e.target = document
                    //we need to filter it via construction below. See https://github.com/vitalets/x-editable/issues/199
                    //Possibly related to http://stackoverflow.com/questions/10119793/why-does-firefox-react-differently-from-webkit-and-ie-to-click-event-on-selec
                    if($target.is(document)) {
                        return;
                    }

                    //if click inside one of exclude classes --> no nothing
                    for(i=0; i<exclude_classes.length; i++) {
                        if($target.is(exclude_classes[i]) || $target.parents(exclude_classes[i]).length) {
                            return;
                        }
                    }

                    //close all open containers (except one - target)
                    Popup.prototype.closeOthers(e.target);
                });

                $(document).data('editable-handlers-attached', true);
            }
        },

        //split options on containerOptions and formOptions
        splitOptions: function() {
            this.containerOptions = {};
            this.formOptions = {};

            if(!$.fn[this.containerName]) {
                throw new Error(this.containerName + ' not found. Have you included corresponding js file?');
            }

            //keys defined in container defaults go to container, others go to form
            for(var k in this.options) {
                if(k in this.defaults) {
                    this.containerOptions[k] = this.options[k];
                } else {
                    this.formOptions[k] = this.options[k];
                }
            }
        },

        /*
         Returns jquery object of container
         @method tip()
         */
        tip: function() {
            return this.container() ? this.container().$tip : null;
        },

        /* returns container object */
        container: function() {
            var container;
            //first, try get it by `containerDataName`
            if(this.containerDataName) {
                if(container = this.$element.data(this.containerDataName)) {
                    return container;
                }
            }
            //second, try `containerName`
            container = this.$element.data(this.containerName);
            return container;
        },

        /* call native method of underlying container, e.g. this.$element.popover('method') */
        call: function() {
            this.$element[this.containerName].apply(this.$element, arguments);
        },

        initContainer: function(){
            this.call(this.containerOptions);
        },

        renderForm: function() {
            this.$form
                .editableform(this.formOptions)
                .on({
                    save: $.proxy(this.save, this), //click on submit button (value changed)
                    nochange: $.proxy(function(){ this.hide('nochange'); }, this), //click on submit button (value NOT changed)
                    cancel: $.proxy(function(){ this.hide('cancel'); }, this), //click on calcel button
                    show: $.proxy(function() {
                        if(this.delayedHide) {
                            this.hide(this.delayedHide.reason);
                            this.delayedHide = false;
                        } else {
                            this.setPosition();
                        }
                    }, this), //re-position container every time form is shown (occurs each time after loading state)
                    rendering: $.proxy(this.setPosition, this), //this allows to place container correctly when loading shown
                    resize: $.proxy(this.setPosition, this), //this allows to re-position container when form size is changed
                    rendered: $.proxy(function(){
                        /**
                         Fired when container is shown and form is rendered (for select will wait for loading dropdown options).
                         **Note:** Bootstrap popover has own `shown` event that now cannot be separated from x-editable's one.
                         The workaround is to check `arguments.length` that is always `2` for x-editable.

                         @event shown
                         @param {Object} event event object
                         @example
                         $('#username').on('shown', function(e, editable) {
                        editable.input.$input.val('overwriting value of input..');
                    });
                         **/
                        /*
                         TODO: added second param mainly to distinguish from bootstrap's shown event. It's a hotfix that will be solved in future versions via namespaced events.
                         */
                        this.$element.triggerHandler('shown', $(this.options.scope).data('editable'));
                    }, this)
                })
                .editableform('render');
        },

        /**
         Shows container with form
         @method show()
         @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
         **/
        /* Note: poshytip owerwrites this method totally! */
        show: function (closeAll) {
            this.$element.addClass('editable-open');
            if(closeAll !== false) {
                //close all open containers (except this)
                this.closeOthers(this.$element[0]);
            }

            //show container itself
            this.innerShow();
            this.tip().addClass(this.containerClass);

            /*
             Currently, form is re-rendered on every show.
             The main reason is that we dont know, what will container do with content when closed:
             remove(), detach() or just hide() - it depends on container.

             Detaching form itself before hide and re-insert before show is good solution,
             but visually it looks ugly --> container changes size before hide.
             */

            //if form already exist - delete previous data
            if(this.$form) {
                //todo: destroy prev data!
                //this.$form.destroy();
            }

            this.$form = $('<div>');

            //insert form into container body
            if(this.tip().is(this.innerCss)) {
                //for inline container
                this.tip().append(this.$form);
            } else {
                this.tip().find(this.innerCss).append(this.$form);
            }

            //render form
            this.renderForm();
        },

        /**
         Hides container with form
         @method hide()
         @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|undefined (=manual)</code>
         **/
        hide: function(reason) {
            if(!this.tip() || !this.tip().is(':visible') || !this.$element.hasClass('editable-open')) {
                return;
            }

            //if form is saving value, schedule hide
            if(this.$form.data('editableform').isSaving) {
                this.delayedHide = {reason: reason};
                return;
            } else {
                this.delayedHide = false;
            }

            this.$element.removeClass('editable-open');
            this.innerHide();

            /**
             Fired when container was hidden. It occurs on both save or cancel.
             **Note:** Bootstrap popover has own `hidden` event that now cannot be separated from x-editable's one.
             The workaround is to check `arguments.length` that is always `2` for x-editable.

             @event hidden
             @param {object} event event object
             @param {string} reason Reason caused hiding. Can be <code>save|cancel|onblur|nochange|manual</code>
             @example
             $('#username').on('hidden', function(e, reason) {
                if(reason === 'save' || reason === 'cancel') {
                    //auto-open next editable
                    $(this).closest('tr').next().find('.editable').editable('show');
                }
            });
             **/
            this.$element.triggerHandler('hidden', reason || 'manual');
        },

        /* internal show method. To be overwritten in child classes */
        innerShow: function () {

        },

        /* internal hide method. To be overwritten in child classes */
        innerHide: function () {

        },

        /**
         Toggles container visibility (show / hide)
         @method toggle()
         @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
         **/
        toggle: function(closeAll) {
            if(this.container() && this.tip() && this.tip().is(':visible')) {
                this.hide();
            } else {
                this.show(closeAll);
            }
        },

        /*
         Updates the position of container when content changed.
         @method setPosition()
         */
        setPosition: function() {
            //tbd in child class
        },

        save: function(e, params) {
            /**
             Fired when new value was submitted. You can use <code>$(this).data('editableContainer')</code> inside handler to access to editableContainer instance

             @event save
             @param {Object} event event object
             @param {Object} params additional params
             @param {mixed} params.newValue submitted value
             @param {Object} params.response ajax response
             @example
             $('#username').on('save', function(e, params) {
                //assuming server response: '{success: true}'
                var pk = $(this).data('editableContainer').options.pk;
                if(params.response && params.response.success) {
                    alert('value: ' + params.newValue + ' with pk: ' + pk + ' saved!');
                } else {
                    alert('error!');
                }
            });
             **/
            this.$element.triggerHandler('save', params);

            //hide must be after trigger, as saving value may require methods of plugin, applied to input
            this.hide('save');
        },

        /**
         Sets new option

         @method option(key, value)
         @param {string} key
         @param {mixed} value
         **/
        option: function(key, value) {
            this.options[key] = value;
            if(key in this.containerOptions) {
                this.containerOptions[key] = value;
                this.setContainerOption(key, value);
            } else {
                this.formOptions[key] = value;
                if(this.$form) {
                    this.$form.editableform('option', key, value);
                }
            }
        },

        setContainerOption: function(key, value) {
            this.call('option', key, value);
        },

        /**
         Destroys the container instance
         @method destroy()
         **/
        destroy: function() {
            this.hide();
            this.innerDestroy();
            this.$element.off('destroyed');
            this.$element.removeData('editableContainer');
        },

        /* to be overwritten in child classes */
        innerDestroy: function() {

        },

        /*
         Closes other containers except one related to passed element.
         Other containers can be cancelled or submitted (depends on onblur option)
         */
        closeOthers: function(element) {
            $('.editable-open').each(function(i, el){
                //do nothing with passed element and it's children
                if(el === element || $(el).find(element).length) {
                    return;
                }

                //otherwise cancel or submit all open containers
                var $el = $(el),
                    ec = $el.data('editableContainer');

                if(!ec) {
                    return;
                }

                if(ec.options.onblur === 'cancel') {
                    $el.data('editableContainer').hide('onblur');
                } else if(ec.options.onblur === 'submit') {
                    $el.data('editableContainer').tip().find('form').submit();
                }
            });

        },

        /**
         Activates input of visible container (e.g. set focus)
         @method activate()
         **/
        activate: function() {
            if(this.tip && this.tip().is(':visible') && this.$form) {
                this.$form.data('editableform').input.activate();
            }
        }

    };

    /**
     jQuery method to initialize editableContainer.

     @method $().editableContainer(options)
     @params {Object} options
     @example
     $('#edit').editableContainer({
        type: 'text',
        url: '/post',
        pk: 1,
        value: 'hello'
    });
     **/
    $.fn.editableContainer = function (option) {
        var args = arguments;
        return this.each(function () {
            var $this = $(this),
                dataKey = 'editableContainer',
                data = $this.data(dataKey),
                options = typeof option === 'object' && option,
                Constructor = (options.mode === 'inline') ? Inline : Popup;

            if (!data) {
                $this.data(dataKey, (data = new Constructor(this, options)));
            }

            if (typeof option === 'string') { //call method
                data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });
    };

    //store constructors
    $.fn.editableContainer.Popup = Popup;
    $.fn.editableContainer.Inline = Inline;

    //defaults
    $.fn.editableContainer.defaults = {
        /**
         Initial value of form input

         @property value
         @type mixed
         @default null
         @private
         **/
        value: null,
        /**
         Placement of container relative to element. Can be <code>top|right|bottom|left</code>. Not used for inline container.

         @property placement
         @type string
         @default 'top'
         **/
        placement: 'top',
        /**
         Whether to hide container on save/cancel.

         @property autohide
         @type boolean
         @default true
         @private
         **/
        autohide: true,
        /**
         Action when user clicks outside the container. Can be <code>cancel|submit|ignore</code>.
         Setting <code>ignore</code> allows to have several containers open.

         @property onblur
         @type string
         @default 'cancel'
         @since 1.1.1
         **/
        onblur: 'cancel',

        /**
         Animation speed (inline mode only)
         @property anim
         @type string
         @default false
         **/
        anim: false,

        /**
         Mode of editable, can be `popup` or `inline`

         @property mode
         @type string
         @default 'popup'
         @since 1.4.0
         **/
        mode: 'popup'
    };

    /*
     * workaround to have 'destroyed' event to destroy popover when element is destroyed
     * see http://stackoverflow.com/questions/2200494/jquery-trigger-event-when-an-element-is-removed-from-the-dom
     */
    jQuery.event.special.destroyed = {
        remove: function(o) {
            if (o.handler) {
                o.handler();
            }
        }
    };

}(window.jQuery));

/**
 * Editable Inline
 * ---------------------
 */
(function ($) {
    "use strict";

    //copy prototype from EditableContainer
    //extend methods
    $.extend($.fn.editableContainer.Inline.prototype, $.fn.editableContainer.Popup.prototype, {
        containerName: 'editableform',
        innerCss: '.editable-inline',
        containerClass: 'editable-container editable-inline', //css class applied to container element

        initContainer: function(){
            //container is <span> element
            this.$tip = $('<span></span>');

            //convert anim to miliseconds (int)
            if(!this.options.anim) {
                this.options.anim = 0;
            }
        },

        splitOptions: function() {
            //all options are passed to form
            this.containerOptions = {};
            this.formOptions = this.options;
        },

        tip: function() {
            return this.$tip;
        },

        innerShow: function () {
            this.$element.hide();
            this.tip().insertAfter(this.$element).show();
        },

        innerHide: function () {
            this.$tip.hide(this.options.anim, $.proxy(function() {
                this.$element.show();
                this.innerDestroy();
            }, this));
        },

        innerDestroy: function() {
            if(this.tip()) {
                this.tip().empty().remove();
            }
        }
    });

}(window.jQuery));
/**
 Makes editable any HTML element on the page. Applied as jQuery method.

 @class editable
 @uses editableContainer
 **/
(function ($) {
    "use strict";

    var Editable = function (element, options) {
        this.$element = $(element);
        //data-* has more priority over js options: because dynamically created elements may change data-*
        this.options = $.extend({}, $.fn.editable.defaults, options, $.fn.editableutils.getConfigData(this.$element));
        if(this.options.selector) {
            this.initLive();
        } else {
            this.init();
        }

        //check for transition support
        if(this.options.highlight && !$.fn.editableutils.supportsTransitions()) {
            this.options.highlight = false;
        }
    };

    Editable.prototype = {
        constructor: Editable,
        init: function () {
            var isValueByText = false,
                doAutotext, finalize;

            //name
            this.options.name = this.options.name || this.$element.attr('id');

            //create input of specified type. Input needed already here to convert value for initial display (e.g. show text by id for select)
            //also we set scope option to have access to element inside input specific callbacks (e. g. source as function)
            this.options.scope = this.$element[0];
            this.input = $.fn.editableutils.createInput(this.options);
            if(!this.input) {
                return;
            }

            //set value from settings or by element's text
            if (this.options.value === undefined || this.options.value === null) {
                this.value = this.input.html2value($.trim(this.$element.html()));
                isValueByText = true;
            } else {
                /*
                 value can be string when received from 'data-value' attribute
                 for complext objects value can be set as json string in data-value attribute,
                 e.g. data-value="{city: 'Moscow', street: 'Lenina'}"
                 */
                this.options.value = $.fn.editableutils.tryParseJson(this.options.value, true);
                if(typeof this.options.value === 'string') {
                    this.value = this.input.str2value(this.options.value);
                } else {
                    this.value = this.options.value;
                }
            }

            //add 'editable' class to every editable element
            this.$element.addClass('editable');

            //specifically for "textarea" add class .editable-pre-wrapped to keep linebreaks
            if(this.input.type === 'textarea') {
                this.$element.addClass('editable-pre-wrapped');
            }

            //attach handler activating editable. In disabled mode it just prevent default action (useful for links)
            if(this.options.toggle !== 'manual') {
                this.$element.addClass('editable-click');
                this.$element.on(this.options.toggle + '.editable', $.proxy(function(e){
                    //prevent following link if editable enabled
                    if(!this.options.disabled) {
                        e.preventDefault();
                    }

                    //stop propagation not required because in document click handler it checks event target
                    //e.stopPropagation();

                    if(this.options.toggle === 'mouseenter') {
                        //for hover only show container
                        this.show();
                    } else {
                        //when toggle='click' we should not close all other containers as they will be closed automatically in document click listener
                        var closeAll = (this.options.toggle !== 'click');
                        this.toggle(closeAll);
                    }
                }, this));
            } else {
                this.$element.attr('tabindex', -1); //do not stop focus on element when toggled manually
            }

            //if display is function it's far more convinient to have autotext = always to render correctly on init
            //see https://github.com/vitalets/x-editable-yii/issues/34
            if(typeof this.options.display === 'function') {
                this.options.autotext = 'always';
            }

            //check conditions for autotext:
            switch(this.options.autotext) {
                case 'always':
                    doAutotext = true;
                    break;
                case 'auto':
                    //if element text is empty and value is defined and value not generated by text --> run autotext
                    doAutotext = !$.trim(this.$element.text()).length && this.value !== null && this.value !== undefined && !isValueByText;
                    break;
                default:
                    doAutotext = false;
            }

            //depending on autotext run render() or just finilize init
            $.when(doAutotext ? this.render() : true).then($.proxy(function() {
                if(this.options.disabled) {
                    this.disable();
                } else {
                    this.enable();
                }
                /**
                 Fired when element was initialized by `$().editable()` method.
                 Please note that you should setup `init` handler **before** applying `editable`.

                 @event init
                 @param {Object} event event object
                 @param {Object} editable editable instance (as here it cannot accessed via data('editable'))
                 @since 1.2.0
                 @example
                 $('#username').on('init', function(e, editable) {
                   alert('initialized ' + editable.options.name);
               });
                 $('#username').editable();
                 **/
                this.$element.triggerHandler('init', this);
            }, this));
        },

        /*
         Initializes parent element for live editables
         */
        initLive: function() {
            //store selector
            var selector = this.options.selector;
            //modify options for child elements
            this.options.selector = false;
            this.options.autotext = 'never';
            //listen toggle events
            this.$element.on(this.options.toggle + '.editable', selector, $.proxy(function(e){
                var $target = $(e.target);
                if(!$target.data('editable')) {
                    //if delegated element initially empty, we need to clear it's text (that was manually set to `empty` by user)
                    //see https://github.com/vitalets/x-editable/issues/137
                    if($target.hasClass(this.options.emptyclass)) {
                        $target.empty();
                    }
                    $target.editable(this.options).trigger(e);
                }
            }, this));
        },

        /*
         Renders value into element's text.
         Can call custom display method from options.
         Can return deferred object.
         @method render()
         @param {mixed} response server response (if exist) to pass into display function
         */
        render: function(response) {
            //do not display anything
            if(this.options.display === false) {
                return;
            }

            //if input has `value2htmlFinal` method, we pass callback in third param to be called when source is loaded
            if(this.input.value2htmlFinal) {
                return this.input.value2html(this.value, this.$element[0], this.options.display, response);
                //if display method defined --> use it
            } else if(typeof this.options.display === 'function') {
                return this.options.display.call(this.$element[0], this.value, response);
                //else use input's original value2html() method
            } else {
                return this.input.value2html(this.value, this.$element[0]);
            }
        },

        /**
         Enables editable
         @method enable()
         **/
        enable: function() {
            this.options.disabled = false;
            this.$element.removeClass('editable-disabled');
            this.handleEmpty(this.isEmpty);
            if(this.options.toggle !== 'manual') {
                if(this.$element.attr('tabindex') === '-1') {
                    this.$element.removeAttr('tabindex');
                }
            }
        },

        /**
         Disables editable
         @method disable()
         **/
        disable: function() {
            this.options.disabled = true;
            this.hide();
            this.$element.addClass('editable-disabled');
            this.handleEmpty(this.isEmpty);
            //do not stop focus on this element
            this.$element.attr('tabindex', -1);
        },

        /**
         Toggles enabled / disabled state of editable element
         @method toggleDisabled()
         **/
        toggleDisabled: function() {
            if(this.options.disabled) {
                this.enable();
            } else {
                this.disable();
            }
        },

        /**
         Sets new option

         @method option(key, value)
         @param {string|object} key option name or object with several options
         @param {mixed} value option new value
         @example
         $('.editable').editable('option', 'pk', 2);
         **/
        option: function(key, value) {
            //set option(s) by object
            if(key && typeof key === 'object') {
                $.each(key, $.proxy(function(k, v){
                    this.option($.trim(k), v);
                }, this));
                return;
            }

            //set option by string
            this.options[key] = value;

            //disabled
            if(key === 'disabled') {
                return value ? this.disable() : this.enable();
            }

            //value
            if(key === 'value') {
                this.setValue(value);
            }

            //transfer new option to container!
            if(this.container) {
                this.container.option(key, value);
            }

            //pass option to input directly (as it points to the same in form)
            if(this.input.option) {
                this.input.option(key, value);
            }

        },

        /*
         * set emptytext if element is empty
         */
        handleEmpty: function (isEmpty) {
            //do not handle empty if we do not display anything
            if(this.options.display === false) {
                return;
            }

            /*
             isEmpty may be set directly as param of method.
             It is required when we enable/disable field and can't rely on content
             as node content is text: "Empty" that is not empty %)
             */
            if(isEmpty !== undefined) {
                this.isEmpty = isEmpty;
            } else {
                //detect empty
                //for some inputs we need more smart check
                //e.g. wysihtml5 may have <br>, <p></p>, <img>
                if(typeof(this.input.isEmpty) === 'function') {
                    this.isEmpty = this.input.isEmpty(this.$element);
                } else {
                    this.isEmpty = $.trim(this.$element.html()) === '';
                }
            }

            //emptytext shown only for enabled
            if(!this.options.disabled) {
                if (this.isEmpty) {
                    this.$element.html(this.options.emptytext);
                    if(this.options.emptyclass) {
                        this.$element.addClass(this.options.emptyclass);
                    }
                } else if(this.options.emptyclass) {
                    this.$element.removeClass(this.options.emptyclass);
                }
            } else {
                //below required if element disable property was changed
                if(this.isEmpty) {
                    this.$element.empty();
                    if(this.options.emptyclass) {
                        this.$element.removeClass(this.options.emptyclass);
                    }
                }
            }
        },

        /**
         Shows container with form
         @method show()
         @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
         **/
        show: function (closeAll) {
            if(this.options.disabled) {
                return;
            }

            //init editableContainer: popover, tooltip, inline, etc..
            if(!this.container) {
                var containerOptions = $.extend({}, this.options, {
                    value: this.value,
                    input: this.input //pass input to form (as it is already created)
                });
                this.$element.editableContainer(containerOptions);
                //listen `save` event
                this.$element.on("save.internal", $.proxy(this.save, this));
                this.container = this.$element.data('editableContainer');
            } else if(this.container.tip().is(':visible')) {
                return;
            }

            //show container
            this.container.show(closeAll);
        },

        /**
         Hides container with form
         @method hide()
         **/
        hide: function () {
            if(this.container) {
                this.container.hide();
            }
        },

        /**
         Toggles container visibility (show / hide)
         @method toggle()
         @param {boolean} closeAll Whether to close all other editable containers when showing this one. Default true.
         **/
        toggle: function(closeAll) {
            if(this.container && this.container.tip().is(':visible')) {
                this.hide();
            } else {
                this.show(closeAll);
            }
        },

        /*
         * called when form was submitted
         */
        save: function(e, params) {
            //mark element with unsaved class if needed
            if(this.options.unsavedclass) {
                /*
                 Add unsaved css to element if:
                 - url is not user's function
                 - value was not sent to server
                 - params.response === undefined, that means data was not sent
                 - value changed
                 */
                var sent = false;
                sent = sent || typeof this.options.url === 'function';
                sent = sent || this.options.display === false;
                sent = sent || params.response !== undefined;
                sent = sent || (this.options.savenochange && this.input.value2str(this.value) !== this.input.value2str(params.newValue));

                if(sent) {
                    this.$element.removeClass(this.options.unsavedclass);
                } else {
                    this.$element.addClass(this.options.unsavedclass);
                }
            }

            //highlight when saving
            if(this.options.highlight) {
                var $e = this.$element,
                    bgColor = $e.css('background-color');

                $e.css('background-color', this.options.highlight);
                setTimeout(function(){
                    if(bgColor === 'transparent') {
                        bgColor = '';
                    }
                    $e.css('background-color', bgColor);
                    $e.addClass('editable-bg-transition');
                    setTimeout(function(){
                        $e.removeClass('editable-bg-transition');
                    }, 1700);
                }, 10);
            }

            //set new value
            this.setValue(params.newValue, false, params.response);

            /**
             Fired when new value was submitted. You can use <code>$(this).data('editable')</code> to access to editable instance

             @event save
             @param {Object} event event object
             @param {Object} params additional params
             @param {mixed} params.newValue submitted value
             @param {Object} params.response ajax response
             @example
             $('#username').on('save', function(e, params) {
                alert('Saved value: ' + params.newValue);
            });
             **/
            //event itself is triggered by editableContainer. Description here is only for documentation
        },

        validate: function () {
            if (typeof this.options.validate === 'function') {
                return this.options.validate.call(this, this.value);
            }
        },

        /**
         Sets new value of editable
         @method setValue(value, convertStr)
         @param {mixed} value new value
         @param {boolean} convertStr whether to convert value from string to internal format
         **/
        setValue: function(value, convertStr, response) {
            if(convertStr) {
                this.value = this.input.str2value(value);
            } else {
                this.value = value;
            }
            if(this.container) {
                this.container.option('value', this.value);
            }
            $.when(this.render(response))
                .then($.proxy(function() {
                    this.handleEmpty();
                }, this));
        },

        /**
         Activates input of visible container (e.g. set focus)
         @method activate()
         **/
        activate: function() {
            if(this.container) {
                this.container.activate();
            }
        },

        /**
         Removes editable feature from element
         @method destroy()
         **/
        destroy: function() {
            this.disable();

            if(this.container) {
                this.container.destroy();
            }

            this.input.destroy();

            if(this.options.toggle !== 'manual') {
                this.$element.removeClass('editable-click');
                this.$element.off(this.options.toggle + '.editable');
            }

            this.$element.off("save.internal");

            this.$element.removeClass('editable editable-open editable-disabled');
            this.$element.removeData('editable');
        }
    };

    /* EDITABLE PLUGIN DEFINITION
     * ======================= */

    /**
     jQuery method to initialize editable element.

     @method $().editable(options)
     @params {Object} options
     @example
     $('#username').editable({
        type: 'text',
        url: '/post',
        pk: 1
    });
     **/
    $.fn.editable = function (option) {
        //special API methods returning non-jquery object
        var result = {}, args = arguments, datakey = 'editable';
        switch (option) {
            /**
             Runs client-side validation for all matched editables

             @method validate()
             @returns {Object} validation errors map
             @example
             $('#username, #fullname').editable('validate');
             // possible result:
             {
              username: "username is required",
              fullname: "fullname should be minimum 3 letters length"
            }
             **/
            case 'validate':
                this.each(function () {
                    var $this = $(this), data = $this.data(datakey), error;
                    if (data && (error = data.validate())) {
                        result[data.options.name] = error;
                    }
                });
                return result;

            /**
             Returns current values of editable elements.
             Note that it returns an **object** with name-value pairs, not a value itself. It allows to get data from several elements.
             If value of some editable is `null` or `undefined` it is excluded from result object.
             When param `isSingle` is set to **true** - it is supposed you have single element and will return value of editable instead of object.

             @method getValue()
             @param {bool} isSingle whether to return just value of single element
             @returns {Object} object of element names and values
             @example
             $('#username, #fullname').editable('getValue');
             //result:
             {
            username: "superuser",
            fullname: "John"
            }
             //isSingle = true
             $('#username').editable('getValue', true);
             //result "superuser"
             **/
            case 'getValue':
                if(arguments.length === 2 && arguments[1] === true) { //isSingle = true
                    result = this.eq(0).data(datakey).value;
                } else {
                    this.each(function () {
                        var $this = $(this), data = $this.data(datakey);
                        if (data && data.value !== undefined && data.value !== null) {
                            result[data.options.name] = data.input.value2submit(data.value);
                        }
                    });
                }
                return result;

            /**
             This method collects values from several editable elements and submit them all to server.
             Internally it runs client-side validation for all fields and submits only in case of success.
             See <a href="#newrecord">creating new records</a> for details.

             @method submit(options)
             @param {object} options
             @param {object} options.url url to submit data
             @param {object} options.data additional data to submit
             @param {object} options.ajaxOptions additional ajax options
             @param {function} options.error(obj) error handler
             @param {function} options.success(obj,config) success handler
             @returns {Object} jQuery object
             **/
            case 'submit':  //collects value, validate and submit to server for creating new record
                var config = arguments[1] || {},
                    $elems = this,
                    errors = this.editable('validate'),
                    values;

                if($.isEmptyObject(errors)) {
                    values = this.editable('getValue');
                    if(config.data) {
                        $.extend(values, config.data);
                    }

                    $.ajax($.extend({
                            url: config.url,
                            data: values,
                            type: 'POST'
                        }, config.ajaxOptions))
                        .success(function(response) {
                            //successful response 200 OK
                            if(typeof config.success === 'function') {
                                config.success.call($elems, response, config);
                            }
                        })
                        .error(function(){  //ajax error
                            if(typeof config.error === 'function') {
                                config.error.apply($elems, arguments);
                            }
                        });
                } else { //client-side validation error
                    if(typeof config.error === 'function') {
                        config.error.call($elems, errors);
                    }
                }
                return this;
        }

        //return jquery object
        return this.each(function () {
            var $this = $(this),
                data = $this.data(datakey),
                options = typeof option === 'object' && option;

            //for delegated targets do not store `editable` object for element
            //it's allows several different selectors.
            //see: https://github.com/vitalets/x-editable/issues/312
            if(options && options.selector) {
                data = new Editable(this, options);
                return;
            }

            if (!data) {
                $this.data(datakey, (data = new Editable(this, options)));
            }

            if (typeof option === 'string') { //call method
                data[option].apply(data, Array.prototype.slice.call(args, 1));
            }
        });
    };


    $.fn.editable.defaults = {
        /**
         Type of input. Can be <code>text|textarea|select|date|checklist</code> and more

         @property type
         @type string
         @default 'text'
         **/
        type: 'text',
        /**
         Sets disabled state of editable

         @property disabled
         @type boolean
         @default false
         **/
        disabled: false,
        /**
         How to toggle editable. Can be <code>click|dblclick|mouseenter|manual</code>.
         When set to <code>manual</code> you should manually call <code>show/hide</code> methods of editable.
         **Note**: if you call <code>show</code> or <code>toggle</code> inside **click** handler of some DOM element,
         you need to apply <code>e.stopPropagation()</code> because containers are being closed on any click on document.

         @example
         $('#edit-button').click(function(e) {
            e.stopPropagation();
            $('#username').editable('toggle');
        });

         @property toggle
         @type string
         @default 'click'
         **/
        toggle: 'click',
        /**
         Text shown when element is empty.

         @property emptytext
         @type string
         @default 'Empty'
         **/
        emptytext: 'Empty',
        /**
         Allows to automatically set element's text based on it's value. Can be <code>auto|always|never</code>. Useful for select and date.
         For example, if dropdown list is <code>{1: 'a', 2: 'b'}</code> and element's value set to <code>1</code>, it's html will be automatically set to <code>'a'</code>.
         <code>auto</code> - text will be automatically set only if element is empty.
         <code>always|never</code> - always(never) try to set element's text.

         @property autotext
         @type string
         @default 'auto'
         **/
        autotext: 'auto',
        /**
         Initial value of input. If not set, taken from element's text.
         Note, that if element's text is empty - text is automatically generated from value and can be customized (see `autotext` option).
         For example, to display currency sign:
         @example
         <a id="price" data-type="text" data-value="100"></a>
         <script>
         $('#price').editable({
            ...
            display: function(value) {
              $(this).text(value + '$');
            }
        })
         </script>

         @property value
         @type mixed
         @default element's text
         **/
        value: null,
        /**
         Callback to perform custom displaying of value in element's text.
         If `null`, default input's display used.
         If `false`, no displaying methods will be called, element's text will never change.
         Runs under element's scope.
         _**Parameters:**_

         * `value` current value to be displayed
         * `response` server response (if display called after ajax submit), since 1.4.0

         For _inputs with source_ (select, checklist) parameters are different:

         * `value` current value to be displayed
         * `sourceData` array of items for current input (e.g. dropdown items)
         * `response` server response (if display called after ajax submit), since 1.4.0

         To get currently selected items use `$.fn.editableutils.itemsByValue(value, sourceData)`.

         @property display
         @type function|boolean
         @default null
         @since 1.2.0
         @example
         display: function(value, sourceData) {
           //display checklist as comma-separated values
           var html = [],
               checked = $.fn.editableutils.itemsByValue(value, sourceData);

           if(checked.length) {
               $.each(checked, function(i, v) { html.push($.fn.editableutils.escape(v.text)); });
               $(this).html(html.join(', '));
           } else {
               $(this).empty();
           }
        }
         **/
        display: null,
        /**
         Css class applied when editable text is empty.

         @property emptyclass
         @type string
         @since 1.4.1
         @default editable-empty
         **/
        emptyclass: 'editable-empty',
        /**
         Css class applied when value was stored but not sent to server (`pk` is empty or `send = 'never'`).
         You may set it to `null` if you work with editables locally and submit them together.

         @property unsavedclass
         @type string
         @since 1.4.1
         @default editable-unsaved
         **/
        unsavedclass: 'editable-unsaved',
        /**
         If selector is provided, editable will be delegated to the specified targets.
         Usefull for dynamically generated DOM elements.
         **Please note**, that delegated targets can't be initialized with `emptytext` and `autotext` options,
         as they actually become editable only after first click.
         You should manually set class `editable-click` to these elements.
         Also, if element originally empty you should add class `editable-empty`, set `data-value=""` and write emptytext into element:

         @property selector
         @type string
         @since 1.4.1
         @default null
         @example
         <div id="user">
         <!-- empty -->
         <a href="#" data-name="username" data-type="text" class="editable-click editable-empty" data-value="" title="Username">Empty</a>
         <!-- non-empty -->
         <a href="#" data-name="group" data-type="select" data-source="/groups" data-value="1" class="editable-click" title="Group">Operator</a>
         </div>

         <script>
         $('#user').editable({
            selector: 'a',
            url: '/post',
            pk: 1
        });
         </script>
         **/
        selector: null,
        /**
         Color used to highlight element after update. Implemented via CSS3 transition, works in modern browsers.

         @property highlight
         @type string|boolean
         @since 1.4.5
         @default #FFFF80
         **/
        highlight: '#FFFF80'
    };

}(window.jQuery));

/**
 AbstractInput - base class for all editable inputs.
 It defines interface to be implemented by any input type.
 To create your own input you can inherit from this class.

 @class abstractinput
 **/
(function ($) {
    "use strict";

    //types
    $.fn.editabletypes = {};

    var AbstractInput = function () { };

    AbstractInput.prototype = {
        /**
         Initializes input

         @method init()
         **/
        init: function(type, options, defaults) {
            this.type = type;
            this.options = $.extend({}, defaults, options);
        },

        /*
         this method called before render to init $tpl that is inserted in DOM
         */
        prerender: function() {
            this.$tpl = $(this.options.tpl); //whole tpl as jquery object
            this.$input = this.$tpl;         //control itself, can be changed in render method
            this.$clear = null;              //clear button
            this.error = null;               //error message, if input cannot be rendered
        },

        /**
         Renders input from tpl. Can return jQuery deferred object.
         Can be overwritten in child objects

         @method render()
         **/
        render: function() {

        },

        /**
         Sets element's html by value.

         @method value2html(value, element)
         @param {mixed} value
         @param {DOMElement} element
         **/
        value2html: function(value, element) {
            $(element)[this.options.escape ? 'text' : 'html']($.trim(value));
        },

        /**
         Converts element's html to value

         @method html2value(html)
         @param {string} html
         @returns {mixed}
         **/
        html2value: function(html) {
            return $('<div>').html(html).text();
        },

        /**
         Converts value to string (for internal compare). For submitting to server used value2submit().

         @method value2str(value)
         @param {mixed} value
         @returns {string}
         **/
        value2str: function(value) {
            return value;
        },

        /**
         Converts string received from server into value. Usually from `data-value` attribute.

         @method str2value(str)
         @param {string} str
         @returns {mixed}
         **/
        str2value: function(str) {
            return str;
        },

        /**
         Converts value for submitting to server. Result can be string or object.

         @method value2submit(value)
         @param {mixed} value
         @returns {mixed}
         **/
        value2submit: function(value) {
            return value;
        },

        /**
         Sets value of input.

         @method value2input(value)
         @param {mixed} value
         **/
        value2input: function(value) {
            this.$input.val(value);
        },

        /**
         Returns value of input. Value can be object (e.g. datepicker)

         @method input2value()
         **/
        input2value: function() {
            return this.$input.val();
        },

        /**
         Activates input. For text it sets focus.

         @method activate()
         **/
        activate: function() {
            if(this.$input.is(':visible')) {
                this.$input.focus();
            }
        },

        /**
         Creates input.

         @method clear()
         **/
        clear: function() {
            this.$input.val(null);
        },

        /**
         method to escape html.
         **/
        escape: function(str) {
            return $('<div>').text(str).html();
        },

        /**
         attach handler to automatically submit form when value changed (useful when buttons not shown)
         **/
        autosubmit: function() {

        },

        /**
         Additional actions when destroying element
         **/
        destroy: function() {
        },

        // -------- helper functions --------
        setClass: function() {
            if(this.options.inputclass) {
                this.$input.addClass(this.options.inputclass);
            }
        },

        setAttr: function(attr) {
            if (this.options[attr] !== undefined && this.options[attr] !== null) {
                this.$input.attr(attr, this.options[attr]);
            }
        },

        option: function(key, value) {
            this.options[key] = value;
        }

    };

    AbstractInput.defaults = {
        /**
         HTML template of input. Normally you should not change it.

         @property tpl
         @type string
         @default ''
         **/
        tpl: '',
        /**
         CSS class automatically applied to input

         @property inputclass
         @type string
         @default null
         **/
        inputclass: null,

        /**
         If `true` - html will be escaped in content of element via $.text() method.
         If `false` - html will not be escaped, $.html() used.
         When you use own `display` function, this option obviosly has no effect.

         @property escape
         @type boolean
         @since 1.5.0
         @default true
         **/
        escape: true,

        //scope for external methods (e.g. source defined as function)
        //for internal use only
        scope: null,

        //need to re-declare showbuttons here to get it's value from common config (passed only options existing in defaults)
        showbuttons: true
    };

    $.extend($.fn.editabletypes, {abstractinput: AbstractInput});

}(window.jQuery));

/**
 List - abstract class for inputs that have source option loaded from js array or via ajax

 @class list
 @extends abstractinput
 **/
(function ($) {
    "use strict";

    var List = function (options) {

    };

    $.fn.editableutils.inherit(List, $.fn.editabletypes.abstractinput);

    $.extend(List.prototype, {
        render: function () {
            var deferred = $.Deferred();

            this.error = null;
            this.onSourceReady(function () {
                this.renderList();
                deferred.resolve();
            }, function () {
                this.error = this.options.sourceError;
                deferred.resolve();
            });

            return deferred.promise();
        },

        html2value: function (html) {
            return null; //can't set value by text
        },

        value2html: function (value, element, display, response) {
            var deferred = $.Deferred(),
                success = function () {
                    if(typeof display === 'function') {
                        //custom display method
                        display.call(element, value, this.sourceData, response);
                    } else {
                        this.value2htmlFinal(value, element);
                    }
                    deferred.resolve();
                };

            //for null value just call success without loading source
            if(value === null) {
                success.call(this);
            } else {
                this.onSourceReady(success, function () { deferred.resolve(); });
            }

            return deferred.promise();
        },

        // ------------- additional functions ------------

        onSourceReady: function (success, error) {
            //run source if it function
            var source;
            if ($.isFunction(this.options.source)) {
                source = this.options.source.call(this.options.scope);
                this.sourceData = null;
                //note: if function returns the same source as URL - sourceData will be taken from cahce and no extra request performed
            } else {
                source = this.options.source;
            }

            //if allready loaded just call success
            if(this.options.sourceCache && $.isArray(this.sourceData)) {
                success.call(this);
                return;
            }

            //try parse json in single quotes (for double quotes jquery does automatically)
            try {
                source = $.fn.editableutils.tryParseJson(source, false);
            } catch (e) {
                error.call(this);
                return;
            }

            //loading from url
            if (typeof source === 'string') {
                //try to get sourceData from cache
                if(this.options.sourceCache) {
                    var cacheID = source,
                        cache;

                    if (!$(document).data(cacheID)) {
                        $(document).data(cacheID, {});
                    }
                    cache = $(document).data(cacheID);

                    //check for cached data
                    if (cache.loading === false && cache.sourceData) { //take source from cache
                        this.sourceData = cache.sourceData;
                        this.doPrepend();
                        success.call(this);
                        return;
                    } else if (cache.loading === true) { //cache is loading, put callback in stack to be called later
                        cache.callbacks.push($.proxy(function () {
                            this.sourceData = cache.sourceData;
                            this.doPrepend();
                            success.call(this);
                        }, this));

                        //also collecting error callbacks
                        cache.err_callbacks.push($.proxy(error, this));
                        return;
                    } else { //no cache yet, activate it
                        cache.loading = true;
                        cache.callbacks = [];
                        cache.err_callbacks = [];
                    }
                }

                //ajaxOptions for source. Can be overwritten bt options.sourceOptions
                var ajaxOptions = $.extend({
                    url: source,
                    type: 'get',
                    cache: false,
                    dataType: 'json',
                    success: $.proxy(function (data) {
                        if(cache) {
                            cache.loading = false;
                        }
                        this.sourceData = this.makeArray(data);
                        if($.isArray(this.sourceData)) {
                            if(cache) {
                                //store result in cache
                                cache.sourceData = this.sourceData;
                                //run success callbacks for other fields waiting for this source
                                $.each(cache.callbacks, function () { this.call(); });
                            }
                            this.doPrepend();
                            success.call(this);
                        } else {
                            error.call(this);
                            if(cache) {
                                //run error callbacks for other fields waiting for this source
                                $.each(cache.err_callbacks, function () { this.call(); });
                            }
                        }
                    }, this),
                    error: $.proxy(function () {
                        error.call(this);
                        if(cache) {
                            cache.loading = false;
                            //run error callbacks for other fields
                            $.each(cache.err_callbacks, function () { this.call(); });
                        }
                    }, this)
                }, this.options.sourceOptions);

                //loading sourceData from server
                $.ajax(ajaxOptions);

            } else { //options as json/array
                this.sourceData = this.makeArray(source);

                if($.isArray(this.sourceData)) {
                    this.doPrepend();
                    success.call(this);
                } else {
                    error.call(this);
                }
            }
        },

        doPrepend: function () {
            if(this.options.prepend === null || this.options.prepend === undefined) {
                return;
            }

            if(!$.isArray(this.prependData)) {
                //run prepend if it is function (once)
                if ($.isFunction(this.options.prepend)) {
                    this.options.prepend = this.options.prepend.call(this.options.scope);
                }

                //try parse json in single quotes
                this.options.prepend = $.fn.editableutils.tryParseJson(this.options.prepend, true);

                //convert prepend from string to object
                if (typeof this.options.prepend === 'string') {
                    this.options.prepend = {'': this.options.prepend};
                }

                this.prependData = this.makeArray(this.options.prepend);
            }

            if($.isArray(this.prependData) && $.isArray(this.sourceData)) {
                this.sourceData = this.prependData.concat(this.sourceData);
            }
        },

        /*
         renders input list
         */
        renderList: function() {
            // this method should be overwritten in child class
        },

        /*
         set element's html by value
         */
        value2htmlFinal: function(value, element) {
            // this method should be overwritten in child class
        },

        /**
         * convert data to array suitable for sourceData, e.g. [{value: 1, text: 'abc'}, {...}]
         */
        makeArray: function(data) {
            var count, obj, result = [], item, iterateItem;
            if(!data || typeof data === 'string') {
                return null;
            }

            if($.isArray(data)) { //array
                /*
                 function to iterate inside item of array if item is object.
                 Caclulates count of keys in item and store in obj.
                 */
                iterateItem = function (k, v) {
                    obj = {value: k, text: v};
                    if(count++ >= 2) {
                        return false;// exit from `each` if item has more than one key.
                    }
                };

                for(var i = 0; i < data.length; i++) {
                    item = data[i];
                    if(typeof item === 'object') {
                        count = 0; //count of keys inside item
                        $.each(item, iterateItem);
                        //case: [{val1: 'text1'}, {val2: 'text2} ...]
                        if(count === 1) {
                            result.push(obj);
                            //case: [{value: 1, text: 'text1'}, {value: 2, text: 'text2'}, ...]
                        } else if(count > 1) {
                            //removed check of existance: item.hasOwnProperty('value') && item.hasOwnProperty('text')
                            if(item.children) {
                                item.children = this.makeArray(item.children);
                            }
                            result.push(item);
                        }
                    } else {
                        //case: ['text1', 'text2' ...]
                        result.push({value: item, text: item});
                    }
                }
            } else {  //case: {val1: 'text1', val2: 'text2, ...}
                $.each(data, function (k, v) {
                    result.push({value: k, text: v});
                });
            }
            return result;
        },

        option: function(key, value) {
            this.options[key] = value;
            if(key === 'source') {
                this.sourceData = null;
            }
            if(key === 'prepend') {
                this.prependData = null;
            }
        }

    });

    List.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         Source data for list.
         If **array** - it should be in format: `[{value: 1, text: "text1"}, {value: 2, text: "text2"}, ...]`
         For compability, object format is also supported: `{"1": "text1", "2": "text2" ...}` but it does not guarantee elements order.

         If **string** - considered ajax url to load items. In that case results will be cached for fields with the same source and name. See also `sourceCache` option.

         If **function**, it should return data in format above (since 1.4.0).

         Since 1.4.1 key `children` supported to render OPTGROUP (for **select** input only).
         `[{text: "group1", children: [{value: 1, text: "text1"}, {value: 2, text: "text2"}]}, ...]`


         @property source
         @type string | array | object | function
         @default null
         **/
        source: null,
        /**
         Data automatically prepended to the beginning of dropdown list.

         @property prepend
         @type string | array | object | function
         @default false
         **/
        prepend: false,
        /**
         Error message when list cannot be loaded (e.g. ajax error)

         @property sourceError
         @type string
         @default Error when loading list
         **/
        sourceError: 'Error when loading list',
        /**
         if <code>true</code> and source is **string url** - results will be cached for fields with the same source.
         Usefull for editable column in grid to prevent extra requests.

         @property sourceCache
         @type boolean
         @default true
         @since 1.2.0
         **/
        sourceCache: true,
        /**
         Additional ajax options to be used in $.ajax() when loading list from server.
         Useful to send extra parameters (`data` key) or change request method (`type` key).

         @property sourceOptions
         @type object|function
         @default null
         @since 1.5.0
         **/
        sourceOptions: null
    });

    $.fn.editabletypes.list = List;

}(window.jQuery));

/**
 Text input

 @class text
 @extends abstractinput
 @final
 @example
 <a href="#" id="username" data-type="text" data-pk="1">awesome</a>
 <script>
 $(function(){
    $('#username').editable({
        url: '/post',
        title: 'Enter username'
    });
});
 </script>
 **/
(function ($) {
    "use strict";

    var Text = function (options) {
        this.init('text', options, Text.defaults);
    };

    $.fn.editableutils.inherit(Text, $.fn.editabletypes.abstractinput);

    $.extend(Text.prototype, {
        render: function() {
            this.renderClear();
            this.setClass();
            this.setAttr('placeholder');
        },

        activate: function() {
            if(this.$input.is(':visible')) {
                this.$input.focus();
                $.fn.editableutils.setCursorPosition(this.$input.get(0), this.$input.val().length);
                if(this.toggleClear) {
                    this.toggleClear();
                }
            }
        },

        //render clear button
        renderClear:  function() {
            if (this.options.clear) {
                this.$clear = $('<span class="editable-clear-x"></span>');
                this.$input.after(this.$clear)
                    .css('padding-right', 24)
                    .keyup($.proxy(function(e) {
                        //arrows, enter, tab, etc
                        if(~$.inArray(e.keyCode, [40,38,9,13,27])) {
                            return;
                        }

                        clearTimeout(this.t);
                        var that = this;
                        this.t = setTimeout(function() {
                            that.toggleClear(e);
                        }, 100);

                    }, this))
                    .parent().css('position', 'relative');

                this.$clear.click($.proxy(this.clear, this));
            }
        },

        postrender: function() {
            /*
             //now `clear` is positioned via css
             if(this.$clear) {
             //can position clear button only here, when form is shown and height can be calculated
             //                var h = this.$input.outerHeight(true) || 20,
             var h = this.$clear.parent().height(),
             delta = (h - this.$clear.height()) / 2;

             //this.$clear.css({bottom: delta, right: delta});
             }
             */
        },

        //show / hide clear button
        toggleClear: function(e) {
            if(!this.$clear) {
                return;
            }

            var len = this.$input.val().length,
                visible = this.$clear.is(':visible');

            if(len && !visible) {
                this.$clear.show();
            }

            if(!len && visible) {
                this.$clear.hide();
            }
        },

        clear: function() {
            this.$clear.hide();
            this.$input.val('').focus();
        }
    });

    Text.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <input type="text">
         **/
        tpl: '<input type="text">',
        /**
         Placeholder attribute of input. Shown when input is empty.

         @property placeholder
         @type string
         @default null
         **/
        placeholder: null,

        /**
         Whether to show `clear` button

         @property clear
         @type boolean
         @default true
         **/
        clear: true
    });

    $.fn.editabletypes.text = Text;

}(window.jQuery));

/**
 Textarea input

 @class textarea
 @extends abstractinput
 @final
 @example
 <a href="#" id="comments" data-type="textarea" data-pk="1">awesome comment!</a>
 <script>
 $(function(){
    $('#comments').editable({
        url: '/post',
        title: 'Enter comments',
        rows: 10
    });
});
 </script>
 **/
(function ($) {
    "use strict";

    var Textarea = function (options) {
        this.init('textarea', options, Textarea.defaults);
    };

    $.fn.editableutils.inherit(Textarea, $.fn.editabletypes.abstractinput);

    $.extend(Textarea.prototype, {
        render: function () {
            this.setClass();
            this.setAttr('placeholder');
            this.setAttr('rows');

            //ctrl + enter
            this.$input.keydown(function (e) {
                if (e.ctrlKey && e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        },

        //using `white-space: pre-wrap` solves \n  <--> BR conversion very elegant!
        /*
         value2html: function(value, element) {
         var html = '', lines;
         if(value) {
         lines = value.split("\n");
         for (var i = 0; i < lines.length; i++) {
         lines[i] = $('<div>').text(lines[i]).html();
         }
         html = lines.join('<br>');
         }
         $(element).html(html);
         },

         html2value: function(html) {
         if(!html) {
         return '';
         }

         var regex = new RegExp(String.fromCharCode(10), 'g');
         var lines = html.split(/<br\s*\/?>/i);
         for (var i = 0; i < lines.length; i++) {
         var text = $('<div>').html(lines[i]).text();

         // Remove newline characters (\n) to avoid them being converted by value2html() method
         // thus adding extra <br> tags
         text = text.replace(regex, '');

         lines[i] = text;
         }
         return lines.join("\n");
         },
         */
        activate: function() {
            $.fn.editabletypes.text.prototype.activate.call(this);
        }
    });

    Textarea.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <textarea></textarea>
         **/
        tpl:'<textarea></textarea>',
        /**
         @property inputclass
         @default input-large
         **/
        inputclass: 'input-large',
        /**
         Placeholder attribute of input. Shown when input is empty.

         @property placeholder
         @type string
         @default null
         **/
        placeholder: null,
        /**
         Number of rows in textarea

         @property rows
         @type integer
         @default 7
         **/
        rows: 7
    });

    $.fn.editabletypes.textarea = Textarea;

}(window.jQuery));

/**
 Select (dropdown)

 @class select
 @extends list
 @final
 @example
 <a href="#" id="status" data-type="select" data-pk="1" data-url="/post" data-title="Select status"></a>
 <script>
 $(function(){
    $('#status').editable({
        value: 2,
        source: [
              {value: 1, text: 'Active'},
              {value: 2, text: 'Blocked'},
              {value: 3, text: 'Deleted'}
           ]
    });
});
 </script>
 **/
(function ($) {
    "use strict";

    var Select = function (options) {
        this.init('select', options, Select.defaults);
    };

    $.fn.editableutils.inherit(Select, $.fn.editabletypes.list);

    $.extend(Select.prototype, {
        renderList: function() {
            this.$input.empty();

            var fillItems = function($el, data) {
                var attr;
                if($.isArray(data)) {
                    for(var i=0; i<data.length; i++) {
                        attr = {};
                        if(data[i].children) {
                            attr.label = data[i].text;
                            $el.append(fillItems($('<optgroup>', attr), data[i].children));
                        } else {
                            attr.value = data[i].value;
                            if(data[i].disabled) {
                                attr.disabled = true;
                            }
                            $el.append($('<option>', attr).text(data[i].text));
                        }
                    }
                }
                return $el;
            };

            fillItems(this.$input, this.sourceData);

            this.setClass();

            //enter submit
            this.$input.on('keydown.editable', function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        },

        value2htmlFinal: function(value, element) {
            var text = '',
                items = $.fn.editableutils.itemsByValue(value, this.sourceData);

            if(items.length) {
                text = items[0].text;
            }

            //$(element).text(text);
            $.fn.editabletypes.abstractinput.prototype.value2html.call(this, text, element);
        },

        autosubmit: function() {
            this.$input.off('keydown.editable').on('change.editable', function(){
                $(this).closest('form').submit();
            });
        }
    });

    Select.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
        /**
         @property tpl
         @default <select></select>
         **/
        tpl:'<select></select>'
    });

    $.fn.editabletypes.select = Select;

}(window.jQuery));

/**
 List of checkboxes.
 Internally value stored as javascript array of values.

 @class checklist
 @extends list
 @final
 @example
 <a href="#" id="options" data-type="checklist" data-pk="1" data-url="/post" data-title="Select options"></a>
 <script>
 $(function(){
    $('#options').editable({
        value: [2, 3],
        source: [
              {value: 1, text: 'option1'},
              {value: 2, text: 'option2'},
              {value: 3, text: 'option3'}
           ]
    });
});
 </script>
 **/
(function ($) {
    "use strict";

    var Checklist = function (options) {
        this.init('checklist', options, Checklist.defaults);
    };

    $.fn.editableutils.inherit(Checklist, $.fn.editabletypes.list);

    $.extend(Checklist.prototype, {
        renderList: function() {
            var $label, $div;

            this.$tpl.empty();

            if(!$.isArray(this.sourceData)) {
                return;
            }

            for(var i=0; i<this.sourceData.length; i++) {
                $label = $('<label>').append($('<input>', {
                        type: 'checkbox',
                        value: this.sourceData[i].value
                    }))
                    .append($('<span>').text(' '+this.sourceData[i].text));

                $('<div>').append($label).appendTo(this.$tpl);
            }

            this.$input = this.$tpl.find('input[type="checkbox"]');
            this.setClass();
        },

        value2str: function(value) {
            return $.isArray(value) ? value.sort().join($.trim(this.options.separator)) : '';
        },

        //parse separated string
        str2value: function(str) {
            var reg, value = null;
            if(typeof str === 'string' && str.length) {
                reg = new RegExp('\\s*'+$.trim(this.options.separator)+'\\s*');
                value = str.split(reg);
            } else if($.isArray(str)) {
                value = str;
            } else {
                value = [str];
            }
            return value;
        },

        //set checked on required checkboxes
        value2input: function(value) {
            this.$input.prop('checked', false);
            if($.isArray(value) && value.length) {
                this.$input.each(function(i, el) {
                    var $el = $(el);
                    // cannot use $.inArray as it performs strict comparison
                    $.each(value, function(j, val){
                        /*jslint eqeq: true*/
                        if($el.val() == val) {
                            /*jslint eqeq: false*/
                            $el.prop('checked', true);
                        }
                    });
                });
            }
        },

        input2value: function() {
            var checked = [];
            this.$input.filter(':checked').each(function(i, el) {
                checked.push($(el).val());
            });
            return checked;
        },

        //collect text of checked boxes
        value2htmlFinal: function(value, element) {
            var html = [],
                checked = $.fn.editableutils.itemsByValue(value, this.sourceData),
                escape = this.options.escape;

            if(checked.length) {
                $.each(checked, function(i, v) {
                    var text = escape ? $.fn.editableutils.escape(v.text) : v.text;
                    html.push(text);
                });
                $(element).html(html.join('<br>'));
            } else {
                $(element).empty();
            }
        },

        activate: function() {
            this.$input.first().focus();
        },

        autosubmit: function() {
            this.$input.on('keydown', function(e){
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
            });
        }
    });

    Checklist.defaults = $.extend({}, $.fn.editabletypes.list.defaults, {
        /**
         @property tpl
         @default <div></div>
         **/
        tpl:'<div class="editable-checklist"></div>',

        /**
         @property inputclass
         @type string
         @default null
         **/
        inputclass: null,

        /**
         Separator of values when reading from `data-value` attribute

         @property separator
         @type string
         @default ','
         **/
        separator: ','
    });

    $.fn.editabletypes.checklist = Checklist;

}(window.jQuery));

/**
 HTML5 input types.
 Following types are supported:

 * password
 * email
 * url
 * tel
 * number
 * range
 * time

 Learn more about html5 inputs:
 http://www.w3.org/wiki/HTML5_form_additions
 To check browser compatibility please see:
 https://developer.mozilla.org/en-US/docs/HTML/Element/Input

 @class html5types
 @extends text
 @final
 @since 1.3.0
 @example
 <a href="#" id="email" data-type="email" data-pk="1">admin@example.com</a>
 <script>
 $(function(){
    $('#email').editable({
        url: '/post',
        title: 'Enter email'
    });
});
 </script>
 **/

/**
 @property tpl
 @default depends on type
 **/

/*
 Password
 */
(function ($) {
    "use strict";

    var Password = function (options) {
        this.init('password', options, Password.defaults);
    };
    $.fn.editableutils.inherit(Password, $.fn.editabletypes.text);
    $.extend(Password.prototype, {
        //do not display password, show '[hidden]' instead
        value2html: function(value, element) {
            if(value) {
                $(element).text('[hidden]');
            } else {
                $(element).empty();
            }
        },
        //as password not displayed, should not set value by html
        html2value: function(html) {
            return null;
        }
    });
    Password.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="password">'
    });
    $.fn.editabletypes.password = Password;
}(window.jQuery));


/*
 Email
 */
(function ($) {
    "use strict";

    var Email = function (options) {
        this.init('email', options, Email.defaults);
    };
    $.fn.editableutils.inherit(Email, $.fn.editabletypes.text);
    Email.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="email">'
    });
    $.fn.editabletypes.email = Email;
}(window.jQuery));


/*
 Url
 */
(function ($) {
    "use strict";

    var Url = function (options) {
        this.init('url', options, Url.defaults);
    };
    $.fn.editableutils.inherit(Url, $.fn.editabletypes.text);
    Url.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="url">'
    });
    $.fn.editabletypes.url = Url;
}(window.jQuery));


/*
 Tel
 */
(function ($) {
    "use strict";

    var Tel = function (options) {
        this.init('tel', options, Tel.defaults);
    };
    $.fn.editableutils.inherit(Tel, $.fn.editabletypes.text);
    Tel.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="tel">'
    });
    $.fn.editabletypes.tel = Tel;
}(window.jQuery));


/*
 Number
 */
(function ($) {
    "use strict";

    var NumberInput = function (options) {
        this.init('number', options, NumberInput.defaults);
    };
    $.fn.editableutils.inherit(NumberInput, $.fn.editabletypes.text);
    $.extend(NumberInput.prototype, {
        render: function () {
            NumberInput.superclass.render.call(this);
            this.setAttr('min');
            this.setAttr('max');
            this.setAttr('step');
        },
        postrender: function() {
            if(this.$clear) {
                //increase right ffset  for up/down arrows
                this.$clear.css({right: 24});
                /*
                 //can position clear button only here, when form is shown and height can be calculated
                 var h = this.$input.outerHeight(true) || 20,
                 delta = (h - this.$clear.height()) / 2;

                 //add 12px to offset right for up/down arrows
                 this.$clear.css({top: delta, right: delta + 16});
                 */
            }
        }
    });
    NumberInput.defaults = $.extend({}, $.fn.editabletypes.text.defaults, {
        tpl: '<input type="number">',
        inputclass: 'input-mini',
        min: null,
        max: null,
        step: null
    });
    $.fn.editabletypes.number = NumberInput;
}(window.jQuery));


/*
 Range (inherit from number)
 */
(function ($) {
    "use strict";

    var Range = function (options) {
        this.init('range', options, Range.defaults);
    };
    $.fn.editableutils.inherit(Range, $.fn.editabletypes.number);
    $.extend(Range.prototype, {
        render: function () {
            this.$input = this.$tpl.filter('input');

            this.setClass();
            this.setAttr('min');
            this.setAttr('max');
            this.setAttr('step');

            this.$input.on('input', function(){
                $(this).siblings('output').text($(this).val());
            });
        },
        activate: function() {
            this.$input.focus();
        }
    });
    Range.defaults = $.extend({}, $.fn.editabletypes.number.defaults, {
        tpl: '<input type="range"><output style="width: 30px; display: inline-block"></output>',
        inputclass: 'input-medium'
    });
    $.fn.editabletypes.range = Range;
}(window.jQuery));

/*
 Time
 */
(function ($) {
    "use strict";

    var Time = function (options) {
        this.init('time', options, Time.defaults);
    };
    //inherit from abstract, as inheritance from text gives selection error.
    $.fn.editableutils.inherit(Time, $.fn.editabletypes.abstractinput);
    $.extend(Time.prototype, {
        render: function() {
            this.setClass();
        }
    });
    Time.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: '<input type="time">'
    });
    $.fn.editabletypes.time = Time;
}(window.jQuery));

/**
 Select2 input. Based on amazing work of Igor Vaynberg https://github.com/ivaynberg/select2.
 Please see [original select2 docs](http://ivaynberg.github.com/select2) for detailed description and options.

 You should manually download and include select2 distributive:

 <link href="select2/select2.css" rel="stylesheet" type="text/css"></link>
 <script src="select2/select2.js"></script>

 To make it **bootstrap-styled** you can use css from [here](https://github.com/t0m/select2-bootstrap-css):

 <link href="select2-bootstrap.css" rel="stylesheet" type="text/css"></link>

 **Note:** currently `autotext` feature does not work for select2 with `ajax` remote source.
 You need initially put both `data-value` and element's text youself:

 <a href="#" data-type="select2" data-value="1">Text1</a>


 @class select2
 @extends abstractinput
 @since 1.4.1
 @final
 @example
 <a href="#" id="country" data-type="select2" data-pk="1" data-value="ru" data-url="/post" data-title="Select country"></a>
 <script>
 $(function(){
    //local source
    $('#country').editable({
        source: [
              {id: 'gb', text: 'Great Britain'},
              {id: 'us', text: 'United States'},
              {id: 'ru', text: 'Russia'}
           ],
        select2: {
           multiple: true
        }
    });
    //remote source (simple)
    $('#country').editable({
        source: '/getCountries'
    });
    //remote source (advanced)
    $('#country').editable({
        select2: {
            placeholder: 'Select Country',
            allowClear: true,
            minimumInputLength: 3,
            id: function (item) {
                return item.CountryId;
            },
            ajax: {
                url: '/getCountries',
                dataType: 'json',
                data: function (term, page) {
                    return { query: term };
                },
                results: function (data, page) {
                    return { results: data };
                }
            },
            formatResult: function (item) {
                return item.CountryName;
            },
            formatSelection: function (item) {
                return item.CountryName;
            },
            initSelection: function (element, callback) {
                return $.get('/getCountryById', { query: element.val() }, function (data) {
                    callback(data);
                });
            }
        }
    });
});
 </script>
 **/
(function ($) {
    "use strict";

    var Constructor = function (options) {
        this.init('select2', options, Constructor.defaults);

        options.select2 = options.select2 || {};

        this.sourceData = null;

        //placeholder
        if(options.placeholder) {
            options.select2.placeholder = options.placeholder;
        }

        //if not `tags` mode, use source
        if(!options.select2.tags && options.source) {
            var source = options.source;
            //if source is function, call it (once!)
            if ($.isFunction(options.source)) {
                source = options.source.call(options.scope);
            }

            if (typeof source === 'string') {
                options.select2.ajax = options.select2.ajax || {};
                //some default ajax params
                if(!options.select2.ajax.data) {
                    options.select2.ajax.data = function(term) {return { query:term };};
                }
                if(!options.select2.ajax.results) {
                    options.select2.ajax.results = function(data) { return {results:data };};
                }
                options.select2.ajax.url = source;
            } else {
                //check format and convert x-editable format to select2 format (if needed)
                this.sourceData = this.convertSource(source);
                options.select2.data = this.sourceData;
            }
        }

        //overriding objects in config (as by default jQuery extend() is not recursive)
        this.options.select2 = $.extend({}, Constructor.defaults.select2, options.select2);

        //detect whether it is multi-valued
        this.isMultiple = this.options.select2.tags || this.options.select2.multiple;
        this.isRemote = ('ajax' in this.options.select2);

        //store function returning ID of item
        //should be here as used inautotext for local source
        this.idFunc = this.options.select2.id;
        if (typeof(this.idFunc) !== "function") {
            var idKey = this.idFunc || 'id';
            this.idFunc = function (e) { return e[idKey]; };
        }

        //store function that renders text in select2
        this.formatSelection = this.options.select2.formatSelection;
        if (typeof(this.formatSelection) !== "function") {
            this.formatSelection = function (e) { return e.text; };
        }
    };

    $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

    $.extend(Constructor.prototype, {
        render: function() {
            this.setClass();

            //can not apply select2 here as it calls initSelection
            //over input that does not have correct value yet.
            //apply select2 only in value2input
            //this.$input.select2(this.options.select2);

            //when data is loaded via ajax, we need to know when it's done to populate listData
            if(this.isRemote) {
                //listen to loaded event to populate data
                this.$input.on('select2-loaded', $.proxy(function(e) {
                    this.sourceData = e.items.results;
                }, this));
            }

            //trigger resize of editableform to re-position container in multi-valued mode
            if(this.isMultiple) {
                this.$input.on('change', function() {
                    $(this).closest('form').parent().triggerHandler('resize');
                });
            }
        },

        value2html: function(value, element) {
            var text = '', data,
                that = this;

            if(this.options.select2.tags) { //in tags mode just assign value
                data = value;
                //data = $.fn.editableutils.itemsByValue(value, this.options.select2.tags, this.idFunc);
            } else if(this.sourceData) {
                data = $.fn.editableutils.itemsByValue(value, this.sourceData, this.idFunc);
            } else {
                //can not get list of possible values
                //(e.g. autotext for select2 with ajax source)
            }

            //data may be array (when multiple values allowed)
            if($.isArray(data)) {
                //collect selected data and show with separator
                text = [];
                $.each(data, function(k, v){
                    text.push(v && typeof v === 'object' ? that.formatSelection(v) : v);
                });
            } else if(data) {
                text = that.formatSelection(data);
            }

            text = $.isArray(text) ? text.join(this.options.viewseparator) : text;

            //$(element).text(text);
            Constructor.superclass.value2html.call(this, text, element);
        },

        html2value: function(html) {
            return this.options.select2.tags ? this.str2value(html, this.options.viewseparator) : null;
        },

        value2input: function(value) {
            //for local source use data directly from source (to allow autotext)
            /*
             if(!this.isRemote && !this.isMultiple) {
             var items = $.fn.editableutils.itemsByValue(value, this.sourceData, this.idFunc);
             if(items.length) {
             this.$input.select2('data', items[0]);
             return;
             }
             }
             */

            //for remote source just set value, text is updated by initSelection
            if(!this.$input.data('select2')) {
                this.$input.val(value);
                this.$input.select2(this.options.select2);
            } else {
                //second argument needed to separate initial change from user's click (for autosubmit)
                this.$input.val(value).trigger('change', true);
            }

            //if remote source AND no user's initSelection provided --> try to use element's text
            if(this.isRemote && !this.isMultiple && !this.options.select2.initSelection) {
                var customId = this.options.select2.id,
                    customText = this.options.select2.formatSelection;
                if(!customId && !customText) {
                    var data = {id: value, text: $(this.options.scope).text()};
                    this.$input.select2('data', data);
                }
            }
        },

        input2value: function() {
            return this.$input.select2('val');
        },

        str2value: function(str, separator) {
            if(typeof str !== 'string' || !this.isMultiple) {
                return str;
            }

            separator = separator || this.options.select2.separator || $.fn.select2.defaults.separator;

            var val, i, l;

            if (str === null || str.length < 1) {
                return null;
            }
            val = str.split(separator);
            for (i = 0, l = val.length; i < l; i = i + 1) {
                val[i] = $.trim(val[i]);
            }

            return val;
        },

        autosubmit: function() {
            this.$input.on('change', function(e, isInitial){
                if(!isInitial) {
                    $(this).closest('form').submit();
                }
            });
        },

        /*
         Converts source from x-editable format: {value: 1, text: "1"} to
         select2 format: {id: 1, text: "1"}
         */
        convertSource: function(source) {
            if($.isArray(source) && source.length && source[0].value !== undefined) {
                for(var i = 0; i<source.length; i++) {
                    if(source[i].value !== undefined) {
                        source[i].id = source[i].value;
                        delete source[i].value;
                    }
                }
            }
            return source;
        },

        destroy: function() {
            if(this.$input.data('select2')) {
                this.$input.select2('destroy');
            }
        }

    });

    Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <input type="hidden">
         **/
        tpl:'<input type="hidden">',
        /**
         Configuration of select2. [Full list of options](http://ivaynberg.github.com/select2).

         @property select2
         @type object
         @default null
         **/
        select2: null,
        /**
         Placeholder attribute of select

         @property placeholder
         @type string
         @default null
         **/
        placeholder: null,
        /**
         Source data for select. It will be assigned to select2 `data` property and kept here just for convenience.
         Please note, that format is different from simple `select` input: use 'id' instead of 'value'.
         E.g. `[{id: 1, text: "text1"}, {id: 2, text: "text2"}, ...]`.

         @property source
         @type array|string|function
         @default null
         **/
        source: null,
        /**
         Separator used to display tags.

         @property viewseparator
         @type string
         @default ', '
         **/
        viewseparator: ', '
    });

    $.fn.editabletypes.select2 = Constructor;

}(window.jQuery));

/**
 * Combodate - 1.0.4
 * Dropdown date and time picker.
 * Converts text input into dropdowns to pick day, month, year, hour, minute and second.
 * Uses momentjs as datetime library http://momentjs.com.
 * For internalization include corresponding file from https://github.com/timrwood/moment/tree/master/lang
 *
 * Confusion at noon and midnight - see http://en.wikipedia.org/wiki/12-hour_clock#Confusion_at_noon_and_midnight
 * In combodate:
 * 12:00 pm --> 12:00 (24-h format, midday)
 * 12:00 am --> 00:00 (24-h format, midnight, start of day)
 *
 * Differs from momentjs parse rules:
 * 00:00 pm, 12:00 pm --> 12:00 (24-h format, day not change)
 * 00:00 am, 12:00 am --> 00:00 (24-h format, day not change)
 *
 *
 * Author: Vitaliy Potapov
 * Project page: http://github.com/vitalets/combodate
 * Copyright (c) 2012 Vitaliy Potapov. Released under MIT License.
 **/
(function ($) {

    var Combodate = function (element, options) {
        this.$element = $(element);
        if(!this.$element.is('input')) {
            $.error('Combodate should be applied to INPUT element');
            return;
        }
        this.options = $.extend({}, $.fn.combodate.defaults, options, this.$element.data());
        this.init();
    };

    Combodate.prototype = {
        constructor: Combodate,
        init: function () {
            this.map = {
                //key   regexp    moment.method
                day:    ['D',    'date'],
                month:  ['M',    'month'],
                year:   ['Y',    'year'],
                hour:   ['[Hh]', 'hours'],
                minute: ['m',    'minutes'],
                second: ['s',    'seconds'],
                ampm:   ['[Aa]', '']
            };

            this.$widget = $('<span class="combodate"></span>').html(this.getTemplate());

            this.initCombos();

            //update original input on change
            this.$widget.on('change', 'select', $.proxy(function(){
                this.$element.val(this.getValue());
            }, this));

            this.$widget.find('select').css('width', 'auto');

            //hide original input and insert widget
            this.$element.hide().after(this.$widget);

            //set initial value
            this.setValue(this.$element.val() || this.options.value);
        },

        /*
         Replace tokens in template with <select> elements
         */
        getTemplate: function() {
            var tpl = this.options.template;

            //first pass
            $.each(this.map, function(k, v) {
                v = v[0];
                var r = new RegExp(v+'+'),
                    token = v.length > 1 ? v.substring(1, 2) : v;

                tpl = tpl.replace(r, '{'+token+'}');
            });

            //replace spaces with &nbsp;
            tpl = tpl.replace(/ /g, '&nbsp;');

            //second pass
            $.each(this.map, function(k, v) {
                v = v[0];
                var token = v.length > 1 ? v.substring(1, 2) : v;

                tpl = tpl.replace('{'+token+'}', '<select class="'+k+'"></select>');
            });

            return tpl;
        },

        /*
         Initialize combos that presents in template
         */
        initCombos: function() {
            var that = this;
            $.each(this.map, function(k, v) {
                var $c = that.$widget.find('.'+k), f, items;
                if($c.length) {
                    that['$'+k] = $c; //set properties like this.$day, this.$month etc.
                    f = 'fill' + k.charAt(0).toUpperCase() + k.slice(1); //define method name to fill items, e.g `fillDays`
                    items = that[f]();
                    that['$'+k].html(that.renderItems(items));
                }
            });
        },

        /*
         Initialize items of combos. Handles `firstItem` option
         */
        initItems: function(key) {
            var values = [],
                relTime;

            if(this.options.firstItem === 'name') {
                //need both to support moment ver < 2 and  >= 2
                relTime = moment.relativeTime || moment.langData()._relativeTime;
                var header = typeof relTime[key] === 'function' ? relTime[key](1, true, key, false) : relTime[key];
                //take last entry (see momentjs lang files structure)
                header = header.split(' ').reverse()[0];
                values.push(['', header]);
            } else if(this.options.firstItem === 'empty') {
                values.push(['', '']);
            }
            return values;
        },

        /*
         render items to string of <option> tags
         */
        renderItems: function(items) {
            var str = [];
            for(var i=0; i<items.length; i++) {
                str.push('<option value="'+items[i][0]+'">'+items[i][1]+'</option>');
            }
            return str.join("\n");
        },

        /*
         fill day
         */
        fillDay: function() {
            var items = this.initItems('d'), name, i,
                twoDigit = this.options.template.indexOf('DD') !== -1;

            for(i=1; i<=31; i++) {
                name = twoDigit ? this.leadZero(i) : i;
                items.push([i, name]);
            }
            return items;
        },

        /*
         fill month
         */
        fillMonth: function() {
            var items = this.initItems('M'), name, i,
                longNames = this.options.template.indexOf('MMMM') !== -1,
                shortNames = this.options.template.indexOf('MMM') !== -1,
                twoDigit = this.options.template.indexOf('MM') !== -1;

            for(i=0; i<=11; i++) {
                if(longNames) {
                    //see https://github.com/timrwood/momentjs.com/pull/36
                    name = moment().date(1).month(i).format('MMMM');
                } else if(shortNames) {
                    name = moment().date(1).month(i).format('MMM');
                } else if(twoDigit) {
                    name = this.leadZero(i+1);
                } else {
                    name = i+1;
                }
                items.push([i, name]);
            }
            return items;
        },

        /*
         fill year
         */
        fillYear: function() {
            var items = [], name, i,
                longNames = this.options.template.indexOf('YYYY') !== -1;

            for(i=this.options.maxYear; i>=this.options.minYear; i--) {
                name = longNames ? i : (i+'').substring(2);
                items[this.options.yearDescending ? 'push' : 'unshift']([i, name]);
            }

            items = this.initItems('y').concat(items);

            return items;
        },

        /*
         fill hour
         */
        fillHour: function() {
            var items = this.initItems('h'), name, i,
                h12 = this.options.template.indexOf('h') !== -1,
                h24 = this.options.template.indexOf('H') !== -1,
                twoDigit = this.options.template.toLowerCase().indexOf('hh') !== -1,
                min = h12 ? 1 : 0,
                max = h12 ? 12 : 23;

            for(i=min; i<=max; i++) {
                name = twoDigit ? this.leadZero(i) : i;
                items.push([i, name]);
            }
            return items;
        },

        /*
         fill minute
         */
        fillMinute: function() {
            var items = this.initItems('m'), name, i,
                twoDigit = this.options.template.indexOf('mm') !== -1;

            for(i=0; i<=59; i+= this.options.minuteStep) {
                name = twoDigit ? this.leadZero(i) : i;
                items.push([i, name]);
            }
            return items;
        },

        /*
         fill second
         */
        fillSecond: function() {
            var items = this.initItems('s'), name, i,
                twoDigit = this.options.template.indexOf('ss') !== -1;

            for(i=0; i<=59; i+= this.options.secondStep) {
                name = twoDigit ? this.leadZero(i) : i;
                items.push([i, name]);
            }
            return items;
        },

        /*
         fill ampm
         */
        fillAmpm: function() {
            var ampmL = this.options.template.indexOf('a') !== -1,
                ampmU = this.options.template.indexOf('A') !== -1,
                items = [
                    ['am', ampmL ? 'am' : 'AM'],
                    ['pm', ampmL ? 'pm' : 'PM']
                ];
            return items;
        },

        /*
         Returns current date value from combos.
         If format not specified - `options.format` used.
         If format = `null` - Moment object returned.
         */
        getValue: function(format) {
            var dt, values = {},
                that = this,
                notSelected = false;

            //getting selected values
            $.each(this.map, function(k, v) {
                if(k === 'ampm') {
                    return;
                }
                var def = k === 'day' ? 1 : 0;

                values[k] = that['$'+k] ? parseInt(that['$'+k].val(), 10) : def;

                if(isNaN(values[k])) {
                    notSelected = true;
                    return false;
                }
            });

            //if at least one visible combo not selected - return empty string
            if(notSelected) {
                return '';
            }

            //convert hours 12h --> 24h
            if(this.$ampm) {
                //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
                if(values.hour === 12) {
                    values.hour = this.$ampm.val() === 'am' ? 0 : 12;
                } else {
                    values.hour = this.$ampm.val() === 'am' ? values.hour : values.hour+12;
                }
            }

            dt = moment([values.year, values.month, values.day, values.hour, values.minute, values.second]);

            //highlight invalid date
            this.highlight(dt);

            format = format === undefined ? this.options.format : format;
            if(format === null) {
                return dt.isValid() ? dt : null;
            } else {
                return dt.isValid() ? dt.format(format) : '';
            }
        },

        setValue: function(value) {
            if(!value) {
                return;
            }

            var dt = typeof value === 'string' ? moment(value, this.options.format) : moment(value),
                that = this,
                values = {};

            //function to find nearest value in select options
            function getNearest($select, value) {
                var delta = {};
                $select.children('option').each(function(i, opt){
                    var optValue = $(opt).attr('value'),
                        distance;

                    if(optValue === '') return;
                    distance = Math.abs(optValue - value);
                    if(typeof delta.distance === 'undefined' || distance < delta.distance) {
                        delta = {value: optValue, distance: distance};
                    }
                });
                return delta.value;
            }

            if(dt.isValid()) {
                //read values from date object
                $.each(this.map, function(k, v) {
                    if(k === 'ampm') {
                        return;
                    }
                    values[k] = dt[v[1]]();
                });

                if(this.$ampm) {
                    //12:00 pm --> 12:00 (24-h format, midday), 12:00 am --> 00:00 (24-h format, midnight, start of day)
                    if(values.hour >= 12) {
                        values.ampm = 'pm';
                        if(values.hour > 12) {
                            values.hour -= 12;
                        }
                    } else {
                        values.ampm = 'am';
                        if(values.hour === 0) {
                            values.hour = 12;
                        }
                    }
                }

                $.each(values, function(k, v) {
                    //call val() for each existing combo, e.g. this.$hour.val()
                    if(that['$'+k]) {

                        if(k === 'minute' && that.options.minuteStep > 1 && that.options.roundTime) {
                            v = getNearest(that['$'+k], v);
                        }

                        if(k === 'second' && that.options.secondStep > 1 && that.options.roundTime) {
                            v = getNearest(that['$'+k], v);
                        }

                        that['$'+k].val(v);
                    }
                });

                this.$element.val(dt.format(this.options.format));
            }
        },

        /*
         highlight combos if date is invalid
         */
        highlight: function(dt) {
            if(!dt.isValid()) {
                if(this.options.errorClass) {
                    this.$widget.addClass(this.options.errorClass);
                } else {
                    //store original border color
                    if(!this.borderColor) {
                        this.borderColor = this.$widget.find('select').css('border-color');
                    }
                    this.$widget.find('select').css('border-color', 'red');
                }
            } else {
                if(this.options.errorClass) {
                    this.$widget.removeClass(this.options.errorClass);
                } else {
                    this.$widget.find('select').css('border-color', this.borderColor);
                }
            }
        },

        leadZero: function(v) {
            return v <= 9 ? '0' + v : v;
        },

        destroy: function() {
            this.$widget.remove();
            this.$element.removeData('combodate').show();
        }

        //todo: clear method
    };

    $.fn.combodate = function ( option ) {
        var d, args = Array.apply(null, arguments);
        args.shift();

        //getValue returns date as string / object (not jQuery object)
        if(option === 'getValue' && this.length && (d = this.eq(0).data('combodate'))) {
            return d.getValue.apply(d, args);
        }

        return this.each(function () {
            var $this = $(this),
                data = $this.data('combodate'),
                options = typeof option == 'object' && option;
            if (!data) {
                $this.data('combodate', (data = new Combodate(this, options)));
            }
            if (typeof option == 'string' && typeof data[option] == 'function') {
                data[option].apply(data, args);
            }
        });
    };

    $.fn.combodate.defaults = {
        //in this format value stored in original input
        format: 'DD-MM-YYYY HH:mm',
        //in this format items in dropdowns are displayed
        template: 'D / MMM / YYYY   H : mm',
        //initial value, can be `new Date()`
        value: null,
        minYear: 1970,
        maxYear: 2015,
        yearDescending: true,
        minuteStep: 5,
        secondStep: 1,
        firstItem: 'empty', //'name', 'empty', 'none'
        errorClass: null,
        roundTime: true //whether to round minutes and seconds if step > 1
    };

}(window.jQuery));
/**
 Combodate input - dropdown date and time picker.
 Based on [combodate](http://vitalets.github.com/combodate) plugin (included). To use it you should manually include [momentjs](http://momentjs.com).

 <script src="js/moment.min.js"></script>

 Allows to input:

 * only date
 * only time
 * both date and time

 Please note, that format is taken from momentjs and **not compatible** with bootstrap-datepicker / jquery UI datepicker.
 Internally value stored as `momentjs` object.

 @class combodate
 @extends abstractinput
 @final
 @since 1.4.0
 @example
 <a href="#" id="dob" data-type="combodate" data-pk="1" data-url="/post" data-value="1984-05-15" data-title="Select date"></a>
 <script>
 $(function(){
    $('#dob').editable({
        format: 'YYYY-MM-DD',
        viewformat: 'DD.MM.YYYY',
        template: 'D / MMMM / YYYY',
        combodate: {
                minYear: 2000,
                maxYear: 2015,
                minuteStep: 1
           }
        }
    });
 });
 </script>
 **/

/*global moment*/

(function ($) {
    "use strict";

    var Constructor = function (options) {
        this.init('combodate', options, Constructor.defaults);

        //by default viewformat equals to format
        if(!this.options.viewformat) {
            this.options.viewformat = this.options.format;
        }

        //try parse combodate config defined as json string in data-combodate
        options.combodate = $.fn.editableutils.tryParseJson(options.combodate, true);

        //overriding combodate config (as by default jQuery extend() is not recursive)
        this.options.combodate = $.extend({}, Constructor.defaults.combodate, options.combodate, {
            format: this.options.format,
            template: this.options.template
        });
    };

    $.fn.editableutils.inherit(Constructor, $.fn.editabletypes.abstractinput);

    $.extend(Constructor.prototype, {
        render: function () {
            this.$input.combodate(this.options.combodate);

            if($.fn.editableform.engine === 'bs3') {
                this.$input.siblings().find('select').addClass('form-control');
            }

            if(this.options.inputclass) {
                this.$input.siblings().find('select').addClass(this.options.inputclass);
            }
            //"clear" link
            /*
             if(this.options.clear) {
             this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
             e.preventDefault();
             e.stopPropagation();
             this.clear();
             }, this));

             this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
             }
             */
        },

        value2html: function(value, element) {
            var text = value ? value.format(this.options.viewformat) : '';
            //$(element).text(text);
            Constructor.superclass.value2html.call(this, text, element);
        },

        html2value: function(html) {
            return html ? moment(html, this.options.viewformat) : null;
        },

        value2str: function(value) {
            return value ? value.format(this.options.format) : '';
        },

        str2value: function(str) {
            return str ? moment(str, this.options.format) : null;
        },

        value2submit: function(value) {
            return this.value2str(value);
        },

        value2input: function(value) {
            this.$input.combodate('setValue', value);
        },

        input2value: function() {
            return this.$input.combodate('getValue', null);
        },

        activate: function() {
            this.$input.siblings('.combodate').find('select').eq(0).focus();
        },

        /*
         clear:  function() {
         this.$input.data('datepicker').date = null;
         this.$input.find('.active').removeClass('active');
         },
         */

        autosubmit: function() {

        }

    });

    Constructor.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <input type="text">
         **/
        tpl:'<input type="text">',
        /**
         @property inputclass
         @default null
         **/
        inputclass: null,
        /**
         Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
         See list of tokens in [momentjs docs](http://momentjs.com/docs/#/parsing/string-format)

         @property format
         @type string
         @default YYYY-MM-DD
         **/
        format:'YYYY-MM-DD',
        /**
         Format used for displaying date. Also applied when converting date from element's text on init.
         If not specified equals to `format`.

         @property viewformat
         @type string
         @default null
         **/
        viewformat: null,
        /**
         Template used for displaying dropdowns.

         @property template
         @type string
         @default D / MMM / YYYY
         **/
        template: 'D / MMM / YYYY',
        /**
         Configuration of combodate.
         Full list of options: http://vitalets.github.com/combodate/#docs

         @property combodate
         @type object
         @default null
         **/
        combodate: null

        /*
         (not implemented yet)
         Text shown as clear date button.
         If <code>false</code> clear button will not be rendered.

         @property clear
         @type boolean|string
         @default 'x clear'
         */
        //clear: '&times; clear'
    });

    $.fn.editabletypes.combodate = Constructor;

}(window.jQuery));

/*
 Editableform based on Twitter Bootstrap 3
 */
(function ($) {
    "use strict";

    //store parent methods
    var pInitInput = $.fn.editableform.Constructor.prototype.initInput;

    $.extend($.fn.editableform.Constructor.prototype, {
        initTemplate: function() {
            this.$form = $($.fn.editableform.template);
            this.$form.find('.control-group').addClass('form-group');
            this.$form.find('.editable-error-block').addClass('help-block');
        },
        initInput: function() {
            pInitInput.apply(this);

            //for bs3 set default class `input-sm` to standard inputs
            var emptyInputClass = this.input.options.inputclass === null || this.input.options.inputclass === false;
            var defaultClass = 'input-sm';

            //bs3 add `form-control` class to standard inputs
            var stdtypes = 'text,select,textarea,password,email,url,tel,number,range,time,typeaheadjs'.split(',');
            if(~$.inArray(this.input.type, stdtypes)) {
                this.input.$input.addClass('form-control');
                if(emptyInputClass) {
                    this.input.options.inputclass = defaultClass;
                    this.input.$input.addClass(defaultClass);
                }
            }

            //apply bs3 size class also to buttons (to fit size of control)
            var $btn = this.$form.find('.editable-buttons');
            var classes = emptyInputClass ? [defaultClass] : this.input.options.inputclass.split(' ');
            for(var i=0; i<classes.length; i++) {
                // `btn-sm` is default now
                /*
                 if(classes[i].toLowerCase() === 'input-sm') {
                 $btn.find('button').addClass('btn-sm');
                 }
                 */
                if(classes[i].toLowerCase() === 'input-lg') {
                    $btn.find('button').removeClass('btn-sm').addClass('btn-lg');
                }
            }
        }
    });

    //buttons
    $.fn.editableform.buttons =
        '<button type="submit" class="btn btn-primary btn-sm editable-submit">'+
        '<i class="glyphicon glyphicon-ok"></i>'+
        '</button>'+
        '<button type="button" class="btn btn-default btn-sm editable-cancel">'+
        '<i class="glyphicon glyphicon-remove"></i>'+
        '</button>';

    //error classes
    $.fn.editableform.errorGroupClass = 'has-error';
    $.fn.editableform.errorBlockClass = null;
    //engine
    $.fn.editableform.engine = 'bs3';
}(window.jQuery));
/**
 * Editable Popover3 (for Bootstrap 3)
 * ---------------------
 * requires bootstrap-popover.js
 */
(function ($) {
    "use strict";

    //extend methods
    $.extend($.fn.editableContainer.Popup.prototype, {
        containerName: 'popover',
        containerDataName: 'bs.popover',
        innerCss: '.popover-content',
        defaults: $.fn.popover.Constructor.DEFAULTS,

        initContainer: function(){
            $.extend(this.containerOptions, {
                trigger: 'manual',
                selector: false,
                content: ' ',
                template: this.defaults.template
            });

            //as template property is used in inputs, hide it from popover
            var t;
            if(this.$element.data('template')) {
                t = this.$element.data('template');
                this.$element.removeData('template');
            }

            this.call(this.containerOptions);

            if(t) {
                //restore data('template')
                this.$element.data('template', t);
            }
        },

        /* show */
        innerShow: function () {
            this.call('show');
        },

        /* hide */
        innerHide: function () {
            this.call('hide');
        },

        /* destroy */
        innerDestroy: function() {
            this.call('destroy');
        },

        setContainerOption: function(key, value) {
            this.container().options[key] = value;
        },

        /**
         * move popover to new position. This function mainly copied from bootstrap-popover.
         */
        /*jshint laxcomma: true, eqeqeq: false*/
        setPosition: function () {

            (function() {
                /*
                 var $tip = this.tip()
                 , inside
                 , pos
                 , actualWidth
                 , actualHeight
                 , placement
                 , tp
                 , tpt
                 , tpb
                 , tpl
                 , tpr;

                 placement = typeof this.options.placement === 'function' ?
                 this.options.placement.call(this, $tip[0], this.$element[0]) :
                 this.options.placement;

                 inside = /in/.test(placement);

                 $tip
                 //  .detach()
                 //vitalets: remove any placement class because otherwise they dont influence on re-positioning of visible popover
                 .removeClass('top right bottom left')
                 .css({ top: 0, left: 0, display: 'block' });
                 //  .insertAfter(this.$element);

                 pos = this.getPosition(inside);

                 actualWidth = $tip[0].offsetWidth;
                 actualHeight = $tip[0].offsetHeight;

                 placement = inside ? placement.split(' ')[1] : placement;

                 tpb = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                 tpt = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2};
                 tpl = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                 tpr = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};

                 switch (placement) {
                 case 'bottom':
                 if ((tpb.top + actualHeight) > ($(window).scrollTop() + $(window).height())) {
                 if (tpt.top > $(window).scrollTop()) {
                 placement = 'top';
                 } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                 placement = 'right';
                 } else if (tpl.left > $(window).scrollLeft()) {
                 placement = 'left';
                 } else {
                 placement = 'right';
                 }
                 }
                 break;
                 case 'top':
                 if (tpt.top < $(window).scrollTop()) {
                 if ((tpb.top + actualHeight) < ($(window).scrollTop() + $(window).height())) {
                 placement = 'bottom';
                 } else if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                 placement = 'right';
                 } else if (tpl.left > $(window).scrollLeft()) {
                 placement = 'left';
                 } else {
                 placement = 'right';
                 }
                 }
                 break;
                 case 'left':
                 if (tpl.left < $(window).scrollLeft()) {
                 if ((tpr.left + actualWidth) < ($(window).scrollLeft() + $(window).width())) {
                 placement = 'right';
                 } else if (tpt.top > $(window).scrollTop()) {
                 placement = 'top';
                 } else if (tpt.top > $(window).scrollTop()) {
                 placement = 'bottom';
                 } else {
                 placement = 'right';
                 }
                 }
                 break;
                 case 'right':
                 if ((tpr.left + actualWidth) > ($(window).scrollLeft() + $(window).width())) {
                 if (tpl.left > $(window).scrollLeft()) {
                 placement = 'left';
                 } else if (tpt.top > $(window).scrollTop()) {
                 placement = 'top';
                 } else if (tpt.top > $(window).scrollTop()) {
                 placement = 'bottom';
                 }
                 }
                 break;
                 }

                 switch (placement) {
                 case 'bottom':
                 tp = tpb;
                 break;
                 case 'top':
                 tp = tpt;
                 break;
                 case 'left':
                 tp = tpl;
                 break;
                 case 'right':
                 tp = tpr;
                 break;
                 }

                 $tip
                 .offset(tp)
                 .addClass(placement)
                 .addClass('in');
                 */


                var $tip = this.tip();

                var placement = typeof this.options.placement == 'function' ?
                    this.options.placement.call(this, $tip[0], this.$element[0]) :
                    this.options.placement;


                var pos = this.getPosition();
                var actualWidth = $tip[0].offsetWidth;
                var actualHeight = $tip[0].offsetHeight;
                var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);

                this.applyPlacement(calculatedOffset, placement);



            }).call(this.container());
            /*jshint laxcomma: false, eqeqeq: true*/
        }
    });

}(window.jQuery));

/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function( $ ) {

    function UTCDate(){
        return new Date(Date.UTC.apply(Date, arguments));
    }
    function UTCToday(){
        var today = new Date();
        return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    }

    // Picker object

    var Datepicker = function(element, options) {
        var that = this;

        this._process_options(options);

        this.element = $(element);
        this.isInline = false;
        this.isInput = this.element.is('input');
        this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
        this.hasInput = this.component && this.element.find('input').length;
        if(this.component && this.component.length === 0)
            this.component = false;

        this.picker = $(DPGlobal.template);
        this._buildEvents();
        this._attachEvents();

        if(this.isInline) {
            this.picker.addClass('datepicker-inline').appendTo(this.element);
        } else {
            this.picker.addClass('datepicker-dropdown dropdown-menu');
        }

        if (this.o.rtl){
            this.picker.addClass('datepicker-rtl');
            this.picker.find('.prev i, .next i')
                .toggleClass('icon-arrow-left icon-arrow-right');
        }


        this.viewMode = this.o.startView;

        if (this.o.calendarWeeks)
            this.picker.find('tfoot th.today')
                .attr('colspan', function(i, val){
                    return parseInt(val) + 1;
                });

        this._allow_update = false;

        this.setStartDate(this.o.startDate);
        this.setEndDate(this.o.endDate);
        this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

        this.fillDow();
        this.fillMonths();

        this._allow_update = true;

        this.update();
        this.showMode();

        if(this.isInline) {
            this.show();
        }
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        _process_options: function(opts){
            // Store raw options for reference
            this._o = $.extend({}, this._o, opts);
            // Processed options
            var o = this.o = $.extend({}, this._o);

            // Check if "de-DE" style date is available, if not language should
            // fallback to 2 letter code eg "de"
            var lang = o.language;
            if (!dates[lang]) {
                lang = lang.split('-')[0];
                if (!dates[lang])
                    lang = defaults.language;
            }
            o.language = lang;

            switch(o.startView){
                case 2:
                case 'decade':
                    o.startView = 2;
                    break;
                case 1:
                case 'year':
                    o.startView = 1;
                    break;
                default:
                    o.startView = 0;
            }

            switch (o.minViewMode) {
                case 1:
                case 'months':
                    o.minViewMode = 1;
                    break;
                case 2:
                case 'years':
                    o.minViewMode = 2;
                    break;
                default:
                    o.minViewMode = 0;
            }

            o.startView = Math.max(o.startView, o.minViewMode);

            o.weekStart %= 7;
            o.weekEnd = ((o.weekStart + 6) % 7);

            var format = DPGlobal.parseFormat(o.format)
            if (o.startDate !== -Infinity) {
                o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
            }
            if (o.endDate !== Infinity) {
                o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
            }

            o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
            if (!$.isArray(o.daysOfWeekDisabled))
                o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
            o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
                return parseInt(d, 10);
            });
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(evs){
            for (var i=0, el, ev; i<evs.length; i++){
                el = evs[i][0];
                ev = evs[i][1];
                el.on(ev);
            }
        },
        _unapplyEvents: function(evs){
            for (var i=0, el, ev; i<evs.length; i++){
                el = evs[i][0];
                ev = evs[i][1];
                el.off(ev);
            }
        },
        _buildEvents: function(){
            if (this.isInput) { // single input
                this._events = [
                    [this.element, {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }]
                ];
            }
            else if (this.component && this.hasInput){ // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.element.find('input'), {
                        focus: $.proxy(this.show, this),
                        keyup: $.proxy(this.update, this),
                        keydown: $.proxy(this.keydown, this)
                    }],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
            else if (this.element.is('div')) {  // inline datepicker
                this.isInline = true;
            }
            else {
                this._events = [
                    [this.element, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }

            this._secondaryEvents = [
                [this.picker, {
                    click: $.proxy(this.click, this)
                }],
                [$(window), {
                    resize: $.proxy(this.place, this)
                }],
                [$(document), {
                    mousedown: $.proxy(function (e) {
                        // Clicked outside the datepicker, hide it
                        if (!(
                                this.element.is(e.target) ||
                                this.element.find(e.target).size() ||
                                this.picker.is(e.target) ||
                                this.picker.find(e.target).size()
                            )) {
                            this.hide();
                        }
                    }, this)
                }]
            ];
        },
        _attachEvents: function(){
            this._detachEvents();
            this._applyEvents(this._events);
        },
        _detachEvents: function(){
            this._unapplyEvents(this._events);
        },
        _attachSecondaryEvents: function(){
            this._detachSecondaryEvents();
            this._applyEvents(this._secondaryEvents);
        },
        _detachSecondaryEvents: function(){
            this._unapplyEvents(this._secondaryEvents);
        },
        _trigger: function(event, altdate){
            var date = altdate || this.date,
                local_date = new Date(date.getTime() + (date.getTimezoneOffset()*60000));

            this.element.trigger({
                type: event,
                date: local_date,
                format: $.proxy(function(altformat){
                    var format = altformat || this.o.format;
                    return DPGlobal.formatDate(date, format, this.o.language);
                }, this)
            });
        },

        show: function(e) {
            if (!this.isInline)
                this.picker.appendTo('body');
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            this._attachSecondaryEvents();
            if (e) {
                e.preventDefault();
            }
            this._trigger('show');
        },

        hide: function(e){
            if(this.isInline) return;
            if (!this.picker.is(':visible')) return;
            this.picker.hide().detach();
            this._detachSecondaryEvents();
            this.viewMode = this.o.startView;
            this.showMode();

            if (
                this.o.forceParse &&
                (
                    this.isInput && this.element.val() ||
                    this.hasInput && this.element.find('input').val()
                )
            )
                this.setValue();
            this._trigger('hide');
        },

        remove: function() {
            this.hide();
            this._detachEvents();
            this._detachSecondaryEvents();
            this.picker.remove();
            delete this.element.data().datepicker;
            if (!this.isInput) {
                delete this.element.data().date;
            }
        },

        getDate: function() {
            var d = this.getUTCDate();
            return new Date(d.getTime() + (d.getTimezoneOffset()*60000));
        },

        getUTCDate: function() {
            return this.date;
        },

        setDate: function(d) {
            this.setUTCDate(new Date(d.getTime() - (d.getTimezoneOffset()*60000)));
        },

        setUTCDate: function(d) {
            this.date = d;
            this.setValue();
        },

        setValue: function() {
            var formatted = this.getFormattedDate();
            if (!this.isInput) {
                if (this.component){
                    this.element.find('input').val(formatted);
                }
            } else {
                this.element.val(formatted);
            }
        },

        getFormattedDate: function(format) {
            if (format === undefined)
                format = this.o.format;
            return DPGlobal.formatDate(this.date, format, this.o.language);
        },

        setStartDate: function(startDate){
            this._process_options({startDate: startDate});
            this.update();
            this.updateNavArrows();
        },

        setEndDate: function(endDate){
            this._process_options({endDate: endDate});
            this.update();
            this.updateNavArrows();
        },

        setDaysOfWeekDisabled: function(daysOfWeekDisabled){
            this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
            this.update();
            this.updateNavArrows();
        },

        place: function(){
            if(this.isInline) return;
            var zIndex = parseInt(this.element.parents().filter(function() {
                    return $(this).css('z-index') != 'auto';
                }).first().css('z-index'))+10;
            var offset = this.component ? this.component.parent().offset() : this.element.offset();
            var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(true);
            this.picker.css({
                top: offset.top + height,
                left: offset.left,
                zIndex: zIndex
            });
        },

        _allow_update: true,
        update: function(){
            if (!this._allow_update) return;

            var date, fromArgs = false;
            if(arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
                date = arguments[0];
                fromArgs = true;
            } else {
                date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
                delete this.element.data().date;
            }

            this.date = DPGlobal.parseDate(date, this.o.format, this.o.language);

            if(fromArgs) this.setValue();

            if (this.date < this.o.startDate) {
                this.viewDate = new Date(this.o.startDate);
            } else if (this.date > this.o.endDate) {
                this.viewDate = new Date(this.o.endDate);
            } else {
                this.viewDate = new Date(this.date);
            }
            this.fill();
        },

        fillDow: function(){
            var dowCnt = this.o.weekStart,
                html = '<tr>';
            if(this.o.calendarWeeks){
                var cell = '<th class="cw">&nbsp;</th>';
                html += cell;
                this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
            }
            while (dowCnt < this.o.weekStart + 7) {
                html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
            }
            html += '</tr>';
            this.picker.find('.datepicker-days thead').append(html);
        },

        fillMonths: function(){
            var html = '',
                i = 0;
            while (i < 12) {
                html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
            }
            this.picker.find('.datepicker-months td').html(html);
        },

        setRange: function(range){
            if (!range || !range.length)
                delete this.range;
            else
                this.range = $.map(range, function(d){ return d.valueOf(); });
            this.fill();
        },

        getClassNames: function(date){
            var cls = [],
                year = this.viewDate.getUTCFullYear(),
                month = this.viewDate.getUTCMonth(),
                currentDate = this.date.valueOf(),
                today = new Date();
            if (date.getUTCFullYear() < year || (date.getUTCFullYear() == year && date.getUTCMonth() < month)) {
                cls.push('old');
            } else if (date.getUTCFullYear() > year || (date.getUTCFullYear() == year && date.getUTCMonth() > month)) {
                cls.push('new');
            }
            // Compare internal UTC date with local today, not UTC today
            if (this.o.todayHighlight &&
                date.getUTCFullYear() == today.getFullYear() &&
                date.getUTCMonth() == today.getMonth() &&
                date.getUTCDate() == today.getDate()) {
                cls.push('today');
            }
            if (currentDate && date.valueOf() == currentDate) {
                cls.push('active');
            }
            if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
                $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
                cls.push('disabled');
            }
            if (this.range){
                if (date > this.range[0] && date < this.range[this.range.length-1]){
                    cls.push('range');
                }
                if ($.inArray(date.valueOf(), this.range) != -1){
                    cls.push('selected');
                }
            }
            return cls;
        },

        fill: function() {
            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth(),
                startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
                startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
                endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
                endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
                currentDate = this.date && this.date.valueOf(),
                tooltip;
            this.picker.find('.datepicker-days thead th.datepicker-switch')
                .text(dates[this.o.language].months[month]+' '+year);
            this.picker.find('tfoot th.today')
                .text(dates[this.o.language].today)
                .toggle(this.o.todayBtn !== false);
            this.picker.find('tfoot th.clear')
                .text(dates[this.o.language].clear)
                .toggle(this.o.clearBtn !== false);
            this.updateNavArrows();
            this.fillMonths();
            var prevMonth = UTCDate(year, month-1, 28,0,0,0,0),
                day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
            prevMonth.setUTCDate(day);
            prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName;
            while(prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getUTCDay() == this.o.weekStart) {
                    html.push('<tr>');
                    if(this.o.calendarWeeks){
                        // ISO 8601: First week contains first thursday.
                        // ISO also states week starts on Monday, but we can be more abstract here.
                        var
                        // Start of current week: based on weekstart/current date
                            ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
                        // Thursday of this week
                            th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
                        // First Thursday of year, year from thursday
                            yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
                        // Calendar week: ms between thursdays, div ms per day, div 7 days
                            calWeek =  (th - yth) / 864e5 / 7 + 1;
                        html.push('<td class="cw">'+ calWeek +'</td>');

                    }
                }
                clsName = this.getClassNames(prevMonth);
                clsName.push('day');

                var before = this.o.beforeShowDay(prevMonth);
                if (before === undefined)
                    before = {};
                else if (typeof(before) === 'boolean')
                    before = {enabled: before};
                else if (typeof(before) === 'string')
                    before = {classes: before};
                if (before.enabled === false)
                    clsName.push('disabled');
                if (before.classes)
                    clsName = clsName.concat(before.classes.split(/\s+/));
                if (before.tooltip)
                    tooltip = before.tooltip;

                clsName = $.unique(clsName);
                html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
                if (prevMonth.getUTCDay() == this.o.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
            }
            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
            var currentYear = this.date && this.date.getUTCFullYear();

            var months = this.picker.find('.datepicker-months')
                .find('th:eq(1)')
                .text(year)
                .end()
                .find('span').removeClass('active');
            if (currentYear && currentYear == year) {
                months.eq(this.date.getUTCMonth()).addClass('active');
            }
            if (year < startYear || year > endYear) {
                months.addClass('disabled');
            }
            if (year == startYear) {
                months.slice(0, startMonth).addClass('disabled');
            }
            if (year == endYear) {
                months.slice(endMonth+1).addClass('disabled');
            }

            html = '';
            year = parseInt(year/10, 10) * 10;
            var yearCont = this.picker.find('.datepicker-years')
                .find('th:eq(1)')
                .text(year + '-' + (year + 9))
                .end()
                .find('td');
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year'+(i == -1 ? ' old' : i == 10 ? ' new' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
                year += 1;
            }
            yearCont.html(html);
        },

        updateNavArrows: function() {
            if (!this._allow_update) return;

            var d = new Date(this.viewDate),
                year = d.getUTCFullYear(),
                month = d.getUTCMonth();
            switch (this.viewMode) {
                case 0:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
                case 1:
                case 2:
                    if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
                        this.picker.find('.prev').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.prev').css({visibility: 'visible'});
                    }
                    if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
                        this.picker.find('.next').css({visibility: 'hidden'});
                    } else {
                        this.picker.find('.next').css({visibility: 'visible'});
                    }
                    break;
            }
        },

        click: function(e) {
            e.preventDefault();
            var target = $(e.target).closest('span, td, th');
            if (target.length == 1) {
                switch(target[0].nodeName.toLowerCase()) {
                    case 'th':
                        switch(target[0].className) {
                            case 'datepicker-switch':
                                this.showMode(1);
                                break;
                            case 'prev':
                            case 'next':
                                var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
                                switch(this.viewMode){
                                    case 0:
                                        this.viewDate = this.moveMonth(this.viewDate, dir);
                                        break;
                                    case 1:
                                    case 2:
                                        this.viewDate = this.moveYear(this.viewDate, dir);
                                        break;
                                }
                                this.fill();
                                break;
                            case 'today':
                                var date = new Date();
                                date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

                                this.showMode(-2);
                                var which = this.o.todayBtn == 'linked' ? null : 'view';
                                this._setDate(date, which);
                                break;
                            case 'clear':
                                var element;
                                if (this.isInput)
                                    element = this.element;
                                else if (this.component)
                                    element = this.element.find('input');
                                if (element)
                                    element.val("").change();
                                this._trigger('changeDate');
                                this.update();
                                if (this.o.autoclose)
                                    this.hide();
                                break;
                        }
                        break;
                    case 'span':
                        if (!target.is('.disabled')) {
                            this.viewDate.setUTCDate(1);
                            if (target.is('.month')) {
                                var day = 1;
                                var month = target.parent().find('span').index(target);
                                var year = this.viewDate.getUTCFullYear();
                                this.viewDate.setUTCMonth(month);
                                this._trigger('changeMonth', this.viewDate);
                                if (this.o.minViewMode === 1) {
                                    this._setDate(UTCDate(year, month, day,0,0,0,0));
                                }
                            } else {
                                var year = parseInt(target.text(), 10)||0;
                                var day = 1;
                                var month = 0;
                                this.viewDate.setUTCFullYear(year);
                                this._trigger('changeYear', this.viewDate);
                                if (this.o.minViewMode === 2) {
                                    this._setDate(UTCDate(year, month, day,0,0,0,0));
                                }
                            }
                            this.showMode(-1);
                            this.fill();
                        }
                        break;
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')){
                            var day = parseInt(target.text(), 10)||1;
                            var year = this.viewDate.getUTCFullYear(),
                                month = this.viewDate.getUTCMonth();
                            if (target.is('.old')) {
                                if (month === 0) {
                                    month = 11;
                                    year -= 1;
                                } else {
                                    month -= 1;
                                }
                            } else if (target.is('.new')) {
                                if (month == 11) {
                                    month = 0;
                                    year += 1;
                                } else {
                                    month += 1;
                                }
                            }
                            this._setDate(UTCDate(year, month, day,0,0,0,0));
                        }
                        break;
                }
            }
        },

        _setDate: function(date, which){
            if (!which || which == 'date')
                this.date = new Date(date);
            if (!which || which  == 'view')
                this.viewDate = new Date(date);
            this.fill();
            this.setValue();
            this._trigger('changeDate');
            var element;
            if (this.isInput) {
                element = this.element;
            } else if (this.component){
                element = this.element.find('input');
            }
            if (element) {
                element.change();
                if (this.o.autoclose && (!which || which == 'date')) {
                    this.hide();
                }
            }
        },

        moveMonth: function(date, dir){
            if (!dir) return date;
            var new_date = new Date(date.valueOf()),
                day = new_date.getUTCDate(),
                month = new_date.getUTCMonth(),
                mag = Math.abs(dir),
                new_month, test;
            dir = dir > 0 ? 1 : -1;
            if (mag == 1){
                test = dir == -1
                    // If going back one month, make sure month is not current month
                    // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
                    ? function(){ return new_date.getUTCMonth() == month; }
                    // If going forward one month, make sure month is as expected
                    // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
                    : function(){ return new_date.getUTCMonth() != new_month; };
                new_month = month + dir;
                new_date.setUTCMonth(new_month);
                // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
                if (new_month < 0 || new_month > 11)
                    new_month = (new_month + 12) % 12;
            } else {
                // For magnitudes >1, move one month at a time...
                for (var i=0; i<mag; i++)
                    // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
                    new_date = this.moveMonth(new_date, dir);
                // ...then reset the day, keeping it in the new month
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function(){ return new_month != new_date.getUTCMonth(); };
            }
            // Common date-resetting loop -- if date is beyond end of month, make it
            // end of month
            while (test()){
                new_date.setUTCDate(--day);
                new_date.setUTCMonth(new_month);
            }
            return new_date;
        },

        moveYear: function(date, dir){
            return this.moveMonth(date, dir*12);
        },

        dateWithinRange: function(date){
            return date >= this.o.startDate && date <= this.o.endDate;
        },

        keydown: function(e){
            if (this.picker.is(':not(:visible)')){
                if (e.keyCode == 27) // allow escape to hide and re-show picker
                    this.show();
                return;
            }
            var dateChanged = false,
                dir, day, month,
                newDate, newViewDate;
            switch(e.keyCode){
                case 27: // escape
                    this.hide();
                    e.preventDefault();
                    break;
                case 37: // left
                case 39: // right
                    if (!this.o.keyboardNavigation) break;
                    dir = e.keyCode == 37 ? -1 : 1;
                    if (e.ctrlKey){
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir);
                    } else if (e.shiftKey){
                        newDate = this.moveMonth(this.date, dir);
                        newViewDate = this.moveMonth(this.viewDate, dir);
                    } else {
                        newDate = new Date(this.date);
                        newDate.setUTCDate(this.date.getUTCDate() + dir);
                        newViewDate = new Date(this.viewDate);
                        newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
                    }
                    if (this.dateWithinRange(newDate)){
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true;
                    }
                    break;
                case 38: // up
                case 40: // down
                    if (!this.o.keyboardNavigation) break;
                    dir = e.keyCode == 38 ? -1 : 1;
                    if (e.ctrlKey){
                        newDate = this.moveYear(this.date, dir);
                        newViewDate = this.moveYear(this.viewDate, dir);
                    } else if (e.shiftKey){
                        newDate = this.moveMonth(this.date, dir);
                        newViewDate = this.moveMonth(this.viewDate, dir);
                    } else {
                        newDate = new Date(this.date);
                        newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
                        newViewDate = new Date(this.viewDate);
                        newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
                    }
                    if (this.dateWithinRange(newDate)){
                        this.date = newDate;
                        this.viewDate = newViewDate;
                        this.setValue();
                        this.update();
                        e.preventDefault();
                        dateChanged = true;
                    }
                    break;
                case 13: // enter
                    this.hide();
                    e.preventDefault();
                    break;
                case 9: // tab
                    this.hide();
                    break;
            }
            if (dateChanged){
                this._trigger('changeDate');
                var element;
                if (this.isInput) {
                    element = this.element;
                } else if (this.component){
                    element = this.element.find('input');
                }
                if (element) {
                    element.change();
                }
            }
        },

        showMode: function(dir) {
            if (dir) {
                this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
            }
            /*
             vitalets: fixing bug of very special conditions:
             jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
             Method show() does not set display css correctly and datepicker is not shown.
             Changed to .css('display', 'block') solve the problem.
             See https://github.com/vitalets/x-editable/issues/37

             In jquery 1.7.2+ everything works fine.
             */
            //this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
            this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
            this.updateNavArrows();
        }
    };

    var DateRangePicker = function(element, options){
        this.element = $(element);
        this.inputs = $.map(options.inputs, function(i){ return i.jquery ? i[0] : i; });
        delete options.inputs;

        $(this.inputs)
            .datepicker(options)
            .bind('changeDate', $.proxy(this.dateUpdated, this));

        this.pickers = $.map(this.inputs, function(i){ return $(i).data('datepicker'); });
        this.updateDates();
    };
    DateRangePicker.prototype = {
        updateDates: function(){
            this.dates = $.map(this.pickers, function(i){ return i.date; });
            this.updateRanges();
        },
        updateRanges: function(){
            var range = $.map(this.dates, function(d){ return d.valueOf(); });
            $.each(this.pickers, function(i, p){
                p.setRange(range);
            });
        },
        dateUpdated: function(e){
            var dp = $(e.target).data('datepicker'),
                new_date = dp.getUTCDate(),
                i = $.inArray(e.target, this.inputs),
                l = this.inputs.length;
            if (i == -1) return;

            if (new_date < this.dates[i]){
                // Date being moved earlier/left
                while (i>=0 && new_date < this.dates[i]){
                    this.pickers[i--].setUTCDate(new_date);
                }
            }
            else if (new_date > this.dates[i]){
                // Date being moved later/right
                while (i<l && new_date > this.dates[i]){
                    this.pickers[i++].setUTCDate(new_date);
                }
            }
            this.updateDates();
        },
        remove: function(){
            $.map(this.pickers, function(p){ p.remove(); });
            delete this.element.data().datepicker;
        }
    };

    function opts_from_el(el, prefix){
        // Derive options from element data-attrs
        var data = $(el).data(),
            out = {}, inkey,
            replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])'),
            prefix = new RegExp('^' + prefix.toLowerCase());
        for (var key in data)
            if (prefix.test(key)){
                inkey = key.replace(replace, function(_,a){ return a.toLowerCase(); });
                out[inkey] = data[key];
            }
        return out;
    }

    function opts_from_locale(lang){
        // Derive options from locale plugins
        var out = {};
        // Check if "de-DE" style date is available, if not language should
        // fallback to 2 letter code eg "de"
        if (!dates[lang]) {
            lang = lang.split('-')[0]
            if (!dates[lang])
                return;
        }
        var d = dates[lang];
        $.each(locale_opts, function(i,k){
            if (k in d)
                out[k] = d[k];
        });
        return out;
    }

    var old = $.fn.datepicker;
    var datepicker = $.fn.datepicker = function ( option ) {
        var args = Array.apply(null, arguments);
        args.shift();
        var internal_return,
            this_return;
        this.each(function () {
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option == 'object' && option;
            if (!data) {
                var elopts = opts_from_el(this, 'date'),
                // Preliminary otions
                    xopts = $.extend({}, defaults, elopts, options),
                    locopts = opts_from_locale(xopts.language),
                // Options priority: js args, data-attrs, locales, defaults
                    opts = $.extend({}, defaults, locopts, elopts, options);
                if ($this.is('.input-daterange') || opts.inputs){
                    var ropts = {
                        inputs: opts.inputs || $this.find('input').toArray()
                    };
                    $this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
                }
                else{
                    $this.data('datepicker', (data = new Datepicker(this, opts)));
                }
            }
            if (typeof option == 'string' && typeof data[option] == 'function') {
                internal_return = data[option].apply(data, args);
                if (internal_return !== undefined)
                    return false;
            }
        });
        if (internal_return !== undefined)
            return internal_return;
        else
            return this;
    };

    var defaults = $.fn.datepicker.defaults = {
        autoclose: false,
        beforeShowDay: $.noop,
        calendarWeeks: false,
        clearBtn: false,
        daysOfWeekDisabled: [],
        endDate: Infinity,
        forceParse: true,
        format: 'mm/dd/yyyy',
        keyboardNavigation: true,
        language: 'en',
        minViewMode: 0,
        rtl: false,
        startDate: -Infinity,
        startView: 0,
        todayBtn: false,
        todayHighlight: false,
        weekStart: 0
    };
    var locale_opts = $.fn.datepicker.locale_opts = [
        'format',
        'rtl',
        'weekStart'
    ];
    $.fn.datepicker.Constructor = Datepicker;
    var dates = $.fn.datepicker.dates = {
        en: {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            today: "Today",
            clear: "Clear"
        }
    };

    var DPGlobal = {
        modes: [
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }],
        isLeapYear: function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        },
        getDaysInMonth: function (year, month) {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
        nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        parseFormat: function(format){
            // IE treats \0 as a string end in inputs (truncating the value),
            // so it's a bad format delimiter, anyway
            var separators = format.replace(this.validParts, '\0').split('\0'),
                parts = format.match(this.validParts);
            if (!separators || !separators.length || !parts || parts.length === 0){
                throw new Error("Invalid date format.");
            }
            return {separators: separators, parts: parts};
        },
        parseDate: function(date, format, language) {
            if (date instanceof Date) return date;
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
                var part_re = /([\-+]\d+)([dmwy])/,
                    parts = date.match(/([\-+]\d+)([dmwy])/g),
                    part, dir;
                date = new Date();
                for (var i=0; i<parts.length; i++) {
                    part = part_re.exec(parts[i]);
                    dir = parseInt(part[1]);
                    switch(part[2]){
                        case 'd':
                            date.setUTCDate(date.getUTCDate() + dir);
                            break;
                        case 'm':
                            date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
                            break;
                        case 'w':
                            date.setUTCDate(date.getUTCDate() + dir * 7);
                            break;
                        case 'y':
                            date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
                            break;
                    }
                }
                return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
            }
            var parts = date && date.match(this.nonpunctuation) || [],
                date = new Date(),
                parsed = {},
                setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
                setters_map = {
                    yyyy: function(d,v){ return d.setUTCFullYear(v); },
                    yy: function(d,v){ return d.setUTCFullYear(2000+v); },
                    m: function(d,v){
                        v -= 1;
                        while (v<0) v += 12;
                        v %= 12;
                        d.setUTCMonth(v);
                        while (d.getUTCMonth() != v)
                            d.setUTCDate(d.getUTCDate()-1);
                        return d;
                    },
                    d: function(d,v){ return d.setUTCDate(v); }
                },
                val, filtered, part;
            setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
            setters_map['dd'] = setters_map['d'];
            date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
            var fparts = format.parts.slice();
            // Remove noop parts
            if (parts.length != fparts.length) {
                fparts = $(fparts).filter(function(i,p){
                    return $.inArray(p, setters_order) !== -1;
                }).toArray();
            }
            // Process remainder
            if (parts.length == fparts.length) {
                for (var i=0, cnt = fparts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = fparts[i];
                    if (isNaN(val)) {
                        switch(part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(function(){
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(function(){
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                for (var i=0, s; i<setters_order.length; i++){
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s]))
                        setters_map[s](date, parsed[s]);
                }
            }
            return date;
        },
        formatDate: function(date, format, language){
            if (typeof format === 'string')
                format = DPGlobal.parseFormat(format);
            var val = {
                d: date.getUTCDate(),
                D: dates[language].daysShort[date.getUTCDay()],
                DD: dates[language].days[date.getUTCDay()],
                m: date.getUTCMonth() + 1,
                M: dates[language].monthsShort[date.getUTCMonth()],
                MM: dates[language].months[date.getUTCMonth()],
                yy: date.getUTCFullYear().toString().substring(2),
                yyyy: date.getUTCFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            var date = [],
                seps = $.extend([], format.separators);
            for (var i=0, cnt = format.parts.length; i <= cnt; i++) {
                if (seps.length)
                    date.push(seps.shift());
                date.push(val[format.parts[i]]);
            }
            return date.join('');
        },
        headTemplate: '<thead>'+
        '<tr>'+
        '<th class="prev"><i class="icon-arrow-left"/></th>'+
        '<th colspan="5" class="datepicker-switch"></th>'+
        '<th class="next"><i class="icon-arrow-right"/></th>'+
        '</tr>'+
        '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
    };
    DPGlobal.template = '<div class="datepicker">'+
        '<div class="datepicker-days">'+
        '<table class=" table-condensed">'+
        DPGlobal.headTemplate+
        '<tbody></tbody>'+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-months">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-years">'+
        '<table class="table-condensed">'+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        DPGlobal.footTemplate+
        '</table>'+
        '</div>'+
        '</div>';

    $.fn.datepicker.DPGlobal = DPGlobal;


    /* DATEPICKER NO CONFLICT
     * =================== */

    $.fn.datepicker.noConflict = function(){
        $.fn.datepicker = old;
        return this;
    };


    /* DATEPICKER DATA-API
     * ================== */

    $(document).on(
        'focus.datepicker.data-api click.datepicker.data-api',
        '[data-provide="datepicker"]',
        function(e){
            var $this = $(this);
            if ($this.data('datepicker')) return;
            e.preventDefault();
            // component click requires us to explicitly show it
            datepicker.call($this, 'show');
        }
    );
    $(function(){
        //$('[data-provide="datepicker-inline"]').datepicker();
        //vit: changed to support noConflict()
        datepicker.call($('[data-provide="datepicker-inline"]'));
    });

}( window.jQuery ));

/**
 Bootstrap-datepicker.
 Description and examples: https://github.com/eternicode/bootstrap-datepicker.
 For **i18n** you should include js file from here: https://github.com/eternicode/bootstrap-datepicker/tree/master/js/locales
 and set `language` option.
 Since 1.4.0 date has different appearance in **popup** and **inline** modes.

 @class date
 @extends abstractinput
 @final
 @example
 <a href="#" id="dob" data-type="date" data-pk="1" data-url="/post" data-title="Select date">15/05/1984</a>
 <script>
 $(function(){
    $('#dob').editable({
        format: 'yyyy-mm-dd',
        viewformat: 'dd/mm/yyyy',
        datepicker: {
                weekStart: 1
           }
        }
    });
 });
 </script>
 **/
(function ($) {
    "use strict";

    //store bootstrap-datepicker as bdateicker to exclude conflict with jQuery UI one
    $.fn.bdatepicker = $.fn.datepicker.noConflict();
    if(!$.fn.datepicker) { //if there were no other datepickers, keep also original name
        $.fn.datepicker = $.fn.bdatepicker;
    }

    var Date = function (options) {
        this.init('date', options, Date.defaults);
        this.initPicker(options, Date.defaults);
    };

    $.fn.editableutils.inherit(Date, $.fn.editabletypes.abstractinput);

    $.extend(Date.prototype, {
        initPicker: function(options, defaults) {
            //'format' is set directly from settings or data-* attributes

            //by default viewformat equals to format
            if(!this.options.viewformat) {
                this.options.viewformat = this.options.format;
            }

            //try parse datepicker config defined as json string in data-datepicker
            options.datepicker = $.fn.editableutils.tryParseJson(options.datepicker, true);

            //overriding datepicker config (as by default jQuery extend() is not recursive)
            //since 1.4 datepicker internally uses viewformat instead of format. Format is for submit only
            this.options.datepicker = $.extend({}, defaults.datepicker, options.datepicker, {
                format: this.options.viewformat
            });

            //language
            this.options.datepicker.language = this.options.datepicker.language || 'en';

            //store DPglobal
            this.dpg = $.fn.bdatepicker.DPGlobal;

            //store parsed formats
            this.parsedFormat = this.dpg.parseFormat(this.options.format);
            this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat);
        },

        render: function () {
            this.$input.bdatepicker(this.options.datepicker);

            //"clear" link
            if(this.options.clear) {
                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.clear();
                }, this));

                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
            }
        },

        value2html: function(value, element) {
            var text = value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '';
            Date.superclass.value2html.call(this, text, element);
        },

        html2value: function(html) {
            return this.parseDate(html, this.parsedViewFormat);
        },

        value2str: function(value) {
            return value ? this.dpg.formatDate(value, this.parsedFormat, this.options.datepicker.language) : '';
        },

        str2value: function(str) {
            return this.parseDate(str, this.parsedFormat);
        },

        value2submit: function(value) {
            return this.value2str(value);
        },

        value2input: function(value) {
            this.$input.bdatepicker('update', value);
        },

        input2value: function() {
            return this.$input.data('datepicker').date;
        },

        activate: function() {
        },

        clear:  function() {
            this.$input.data('datepicker').date = null;
            this.$input.find('.active').removeClass('active');
            if(!this.options.showbuttons) {
                this.$input.closest('form').submit();
            }
        },

        autosubmit: function() {
            this.$input.on('mouseup', '.day', function(e){
                if($(e.currentTarget).is('.old') || $(e.currentTarget).is('.new')) {
                    return;
                }
                var $form = $(this).closest('form');
                setTimeout(function() {
                    $form.submit();
                }, 200);
            });
            //changedate is not suitable as it triggered when showing datepicker. see #149
            /*
             this.$input.on('changeDate', function(e){
             var $form = $(this).closest('form');
             setTimeout(function() {
             $form.submit();
             }, 200);
             });
             */
        },

        /*
         For incorrect date bootstrap-datepicker returns current date that is not suitable
         for datefield.
         This function returns null for incorrect date.
         */
        parseDate: function(str, format) {
            var date = null, formattedBack;
            if(str) {
                date = this.dpg.parseDate(str, format, this.options.datepicker.language);
                if(typeof str === 'string') {
                    formattedBack = this.dpg.formatDate(date, format, this.options.datepicker.language);
                    if(str !== formattedBack) {
                        date = null;
                    }
                }
            }
            return date;
        }

    });

    Date.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <div></div>
         **/
        tpl:'<div class="editable-date well"></div>',
        /**
         @property inputclass
         @default null
         **/
        inputclass: null,
        /**
         Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
         Possible tokens are: <code>d, dd, m, mm, yy, yyyy</code>

         @property format
         @type string
         @default yyyy-mm-dd
         **/
        format:'yyyy-mm-dd',
        /**
         Format used for displaying date. Also applied when converting date from element's text on init.
         If not specified equals to <code>format</code>

         @property viewformat
         @type string
         @default null
         **/
        viewformat: null,
        /**
         Configuration of datepicker.
         Full list of options: http://vitalets.github.com/bootstrap-datepicker

         @property datepicker
         @type object
         @default {
            weekStart: 0,
            startView: 0,
            minViewMode: 0,
            autoclose: false
        }
         **/
        datepicker:{
            weekStart: 0,
            startView: 0,
            minViewMode: 0,
            autoclose: false
        },
        /**
         Text shown as clear date button.
         If <code>false</code> clear button will not be rendered.

         @property clear
         @type boolean|string
         @default 'x clear'
         **/
        clear: '&times; clear'
    });

    $.fn.editabletypes.date = Date;

}(window.jQuery));

/**
 Bootstrap datefield input - modification for inline mode.
 Shows normal <input type="text"> and binds popup datepicker.
 Automatically shown in inline mode.

 @class datefield
 @extends date

 @since 1.4.0
 **/
(function ($) {
    "use strict";

    var DateField = function (options) {
        this.init('datefield', options, DateField.defaults);
        this.initPicker(options, DateField.defaults);
    };

    $.fn.editableutils.inherit(DateField, $.fn.editabletypes.date);

    $.extend(DateField.prototype, {
        render: function () {
            this.$input = this.$tpl.find('input');
            this.setClass();
            this.setAttr('placeholder');

            //bootstrap-datepicker is set `bdateicker` to exclude conflict with jQuery UI one. (in date.js)
            this.$tpl.bdatepicker(this.options.datepicker);

            //need to disable original event handlers
            this.$input.off('focus keydown');

            //update value of datepicker
            this.$input.keyup($.proxy(function(){
                this.$tpl.removeData('date');
                this.$tpl.bdatepicker('update');
            }, this));

        },

        value2input: function(value) {
            this.$input.val(value ? this.dpg.formatDate(value, this.parsedViewFormat, this.options.datepicker.language) : '');
            this.$tpl.bdatepicker('update');
        },

        input2value: function() {
            return this.html2value(this.$input.val());
        },

        activate: function() {
            $.fn.editabletypes.text.prototype.activate.call(this);
        },

        autosubmit: function() {
            //reset autosubmit to empty
        }
    });

    DateField.defaults = $.extend({}, $.fn.editabletypes.date.defaults, {
        /**
         @property tpl
         **/
        tpl:'<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
        /**
         @property inputclass
         @default 'input-small'
         **/
        inputclass: 'input-small',

        /* datepicker config */
        datepicker: {
            weekStart: 0,
            startView: 0,
            minViewMode: 0,
            autoclose: true
        }
    });

    $.fn.editabletypes.datefield = DateField;

}(window.jQuery));
/**
 Bootstrap-datetimepicker.
 Based on [smalot bootstrap-datetimepicker plugin](https://github.com/smalot/bootstrap-datetimepicker).
 Before usage you should manually include dependent js and css:

 <link href="css/datetimepicker.css" rel="stylesheet" type="text/css"></link>
 <script src="js/bootstrap-datetimepicker.js"></script>

 For **i18n** you should include js file from here: https://github.com/smalot/bootstrap-datetimepicker/tree/master/js/locales
 and set `language` option.

 @class datetime
 @extends abstractinput
 @final
 @since 1.4.4
 @example
 <a href="#" id="last_seen" data-type="datetime" data-pk="1" data-url="/post" title="Select date & time">15/03/2013 12:45</a>
 <script>
 $(function(){
    $('#last_seen').editable({
        format: 'yyyy-mm-dd hh:ii',
        viewformat: 'dd/mm/yyyy hh:ii',
        datetimepicker: {
                weekStart: 1
           }
        }
    });
 });
 </script>
 **/
(function ($) {
    "use strict";

    var DateTime = function (options) {
        this.init('datetime', options, DateTime.defaults);
        this.initPicker(options, DateTime.defaults);
    };

    $.fn.editableutils.inherit(DateTime, $.fn.editabletypes.abstractinput);

    $.extend(DateTime.prototype, {
        initPicker: function(options, defaults) {
            //'format' is set directly from settings or data-* attributes

            //by default viewformat equals to format
            if(!this.options.viewformat) {
                this.options.viewformat = this.options.format;
            }

            //try parse datetimepicker config defined as json string in data-datetimepicker
            options.datetimepicker = $.fn.editableutils.tryParseJson(options.datetimepicker, true);

            //overriding datetimepicker config (as by default jQuery extend() is not recursive)
            //since 1.4 datetimepicker internally uses viewformat instead of format. Format is for submit only
            this.options.datetimepicker = $.extend({}, defaults.datetimepicker, options.datetimepicker, {
                format: this.options.viewformat
            });

            //language
            this.options.datetimepicker.language = this.options.datetimepicker.language || 'en';

            //store DPglobal
            this.dpg = $.fn.datetimepicker.DPGlobal;

            //store parsed formats
            this.parsedFormat = this.dpg.parseFormat(this.options.format, this.options.formatType);
            this.parsedViewFormat = this.dpg.parseFormat(this.options.viewformat, this.options.formatType);
        },

        render: function () {
            this.$input.datetimepicker(this.options.datetimepicker);

            //adjust container position when viewMode changes
            //see https://github.com/smalot/bootstrap-datetimepicker/pull/80
            this.$input.on('changeMode', function(e) {
                var f = $(this).closest('form').parent();
                //timeout here, otherwise container changes position before form has new size
                setTimeout(function(){
                    f.triggerHandler('resize');
                }, 0);
            });

            //"clear" link
            if(this.options.clear) {
                this.$clear = $('<a href="#"></a>').html(this.options.clear).click($.proxy(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    this.clear();
                }, this));

                this.$tpl.parent().append($('<div class="editable-clear">').append(this.$clear));
            }
        },

        value2html: function(value, element) {
            //formatDate works with UTCDate!
            var text = value ? this.dpg.formatDate(this.toUTC(value), this.parsedViewFormat, this.options.datetimepicker.language, this.options.formatType) : '';
            if(element) {
                DateTime.superclass.value2html.call(this, text, element);
            } else {
                return text;
            }
        },

        html2value: function(html) {
            //parseDate return utc date!
            var value = this.parseDate(html, this.parsedViewFormat);
            return value ? this.fromUTC(value) : null;
        },

        value2str: function(value) {
            //formatDate works with UTCDate!
            return value ? this.dpg.formatDate(this.toUTC(value), this.parsedFormat, this.options.datetimepicker.language, this.options.formatType) : '';
        },

        str2value: function(str) {
            //parseDate return utc date!
            var value = this.parseDate(str, this.parsedFormat);
            return value ? this.fromUTC(value) : null;
        },

        value2submit: function(value) {
            return this.value2str(value);
        },

        value2input: function(value) {
            if(value) {
                this.$input.data('datetimepicker').setDate(value);
            }
        },

        input2value: function() {
            //date may be cleared, in that case getDate() triggers error
            var dt = this.$input.data('datetimepicker');
            return dt.date ? dt.getDate() : null;
        },

        activate: function() {
        },

        clear: function() {
            this.$input.data('datetimepicker').date = null;
            this.$input.find('.active').removeClass('active');
            if(!this.options.showbuttons) {
                this.$input.closest('form').submit();
            }
        },

        autosubmit: function() {
            this.$input.on('mouseup', '.minute', function(e){
                var $form = $(this).closest('form');
                setTimeout(function() {
                    $form.submit();
                }, 200);
            });
        },

        //convert date from local to utc
        toUTC: function(value) {
            return value ? new Date(value.valueOf() - value.getTimezoneOffset() * 60000) : value;
        },

        //convert date from utc to local
        fromUTC: function(value) {
            return value ? new Date(value.valueOf() + value.getTimezoneOffset() * 60000) : value;
        },

        /*
         For incorrect date bootstrap-datetimepicker returns current date that is not suitable
         for datetimefield.
         This function returns null for incorrect date.
         */
        parseDate: function(str, format) {
            var date = null, formattedBack;
            if(str) {
                date = this.dpg.parseDate(str, format, this.options.datetimepicker.language, this.options.formatType);
                if(typeof str === 'string') {
                    formattedBack = this.dpg.formatDate(date, format, this.options.datetimepicker.language, this.options.formatType);
                    if(str !== formattedBack) {
                        date = null;
                    }
                }
            }
            return date;
        }

    });

    DateTime.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        /**
         @property tpl
         @default <div></div>
         **/
        tpl:'<div class="editable-date well"></div>',
        /**
         @property inputclass
         @default null
         **/
        inputclass: null,
        /**
         Format used for sending value to server. Also applied when converting date from <code>data-value</code> attribute.<br>
         Possible tokens are: <code>d, dd, m, mm, yy, yyyy, h, i</code>

         @property format
         @type string
         @default yyyy-mm-dd hh:ii
         **/
        format:'yyyy-mm-dd hh:ii',
        formatType:'standard',
        /**
         Format used for displaying date. Also applied when converting date from element's text on init.
         If not specified equals to <code>format</code>

         @property viewformat
         @type string
         @default null
         **/
        viewformat: null,
        /**
         Configuration of datetimepicker.
         Full list of options: https://github.com/smalot/bootstrap-datetimepicker

         @property datetimepicker
         @type object
         @default { }
         **/
        datetimepicker:{
            todayHighlight: false,
            autoclose: false
        },
        /**
         Text shown as clear date button.
         If <code>false</code> clear button will not be rendered.

         @property clear
         @type boolean|string
         @default 'x clear'
         **/
        clear: '&times; clear'
    });

    $.fn.editabletypes.datetime = DateTime;

}(window.jQuery));
/**
 Bootstrap datetimefield input - datetime input for inline mode.
 Shows normal <input type="text"> and binds popup datetimepicker.
 Automatically shown in inline mode.

 @class datetimefield
 @extends datetime

 **/
(function ($) {
    "use strict";

    var DateTimeField = function (options) {
        this.init('datetimefield', options, DateTimeField.defaults);
        this.initPicker(options, DateTimeField.defaults);
    };

    $.fn.editableutils.inherit(DateTimeField, $.fn.editabletypes.datetime);

    $.extend(DateTimeField.prototype, {
        render: function () {
            this.$input = this.$tpl.find('input');
            this.setClass();
            this.setAttr('placeholder');

            this.$tpl.datetimepicker(this.options.datetimepicker);

            //need to disable original event handlers
            this.$input.off('focus keydown');

            //update value of datepicker
            this.$input.keyup($.proxy(function(){
                this.$tpl.removeData('date');
                this.$tpl.datetimepicker('update');
            }, this));

        },

        value2input: function(value) {
            this.$input.val(this.value2html(value));
            this.$tpl.datetimepicker('update');
        },

        input2value: function() {
            return this.html2value(this.$input.val());
        },

        activate: function() {
            $.fn.editabletypes.text.prototype.activate.call(this);
        },

        autosubmit: function() {
            //reset autosubmit to empty
        }
    });

    DateTimeField.defaults = $.extend({}, $.fn.editabletypes.datetime.defaults, {
        /**
         @property tpl
         **/
        tpl:'<div class="input-append date"><input type="text"/><span class="add-on"><i class="icon-th"></i></span></div>',
        /**
         @property inputclass
         @default 'input-medium'
         **/
        inputclass: 'input-medium',

        /* datetimepicker config */
        datetimepicker:{
            todayHighlight: false,
            autoclose: true
        }
    });

    $.fn.editabletypes.datetimefield = DateTimeField;

}(window.jQuery));
(function (){ var b="",aa="\x00",ba="\n",ca="\n//# sourceURL=",da="\n;return exports});\n//# sourceURL=",k=" ",ea=" &#160;",fa=" onreadystatechange='goog.onScriptLoad_(this, ",ga=" should not be enumerable in Object.prototype.",l='"',ha='");',ia='">\x3c/script>',ja="#",ka="$1",la="%s",q="&",ma="&#0;",na="&#101;",oa="&#39;",pa="&amp;",qa="&gt;",ra="&lt;",sa="&quot;",ta="'",ua="(^",va=")' ",wa=")([a-z])",xa=");",ya=", ",za="-",Aa="-$1",r=".",Ba="..",Ca="...",u="/",Da="/loader.js",v="0",Ea="0,(function(){",w=": ",
    x="<",Fa="\x3c/script>",Ga="<br />",Ha="<br>",Ia='<script type="text/javascript" src="',Ja='<script type="text/javascript">',Ka=">",La=">\x3c/script>",Ma="?",Na="Already loaded ",Pa="American Samoa",Qa="Antigua and Barbuda",Ra="Assertion failed",Sa="BY_WHOLE",y="Bolivia",z="Bosna i Hercegovina",Ta="Botswana",Ua="British Virgin Islands",Va="Cayman Islands",Wa="Christmas Island",Xa="Expected Element but got %s: %s.",Ya="Expected array but got %s: %s.",Za="Expected boolean but got %s: %s.",$a="Expected function but got %s: %s.",
    ab="Expected instanceof %s but got %s.",bb="Expected number but got %s: %s.",cb="Expected object but got %s: %s.",db="Expected string but got %s: %s.",eb="Failure",fb="Falkland Islands",B="Ghana",gb="Guin\u00e9e \u00e9quatoriale",hb="Guyane fran\u00e7aise",ib="HEAD",jb="Honduras",kb="Indonesia",lb="Itoophiyaa",mb="JavaScript",nb="Kalaallit Nunaat",ob="Kiribati",pb="Load packages + dependencies - previous: ",qb="Loading css files: ",rb="LocaleNameConstants",sb="Luxembourg",tb="Madagascar",ub="Marshall Islands",
    C="Micronesia",vb="Moldova, Republica",wb="Nederlandse Antillen",xb="New Zealand",D="Nigeria",yb="Norfolk Island",zb="Northern Mariana Islands",Ab="Nouvelle-Cal\u00e9donie",E="Papua New Guinea",Bb="Paraguay",Cb="Philippines",Db="Polyn\u00e9sie fran\u00e7aise",Eb="Puerto Rico",Fb="Rep\u00fablica Dominicana",F="Rwanda",Gb="Rywvaneth Unys",Hb="R\u00e9publique centrafricaine",Ib="R\u00e9publique d\u00e9mocratique du Congo",Jb="SCRIPT",Kb="Saint Kitts and Nevis",Lb="Saint Vincent and the Grenadines",Mb=
        "Saint-Pierre-et-Miquelon",Nb="Serbia and Montenegro",Ob="Seychelles",Pb="Slovensk\u00e1 republika",Qb="Solomon Islands",G="South Africa",Rb="Svalbard og Jan Mayen",Ub="Swaziland",Vb="S\u00e3o Tom\u00e9 e Pr\u00edncipe",H="S\u00e9n\u00e9gal",Wb="Tanzania",Xb="Timor Leste",I="Tokelau",Yb="Turks and Caicos Islands",J="Tuvalu",K="T\u00fcrkiye",Zb="U.S. Virgin Islands",$b="United Kingdom",ac="United States",bc="United States Minor Outlying Islands",cc="Unknown or Invalid Region",L="Vanuatu",dc="Wallis-et-Futuna",
    ec="[object Array]",fc="[object Function]",gc="[object Window]",hc="\\$1",ic="\\s",jc="\\u",kc="\\x",lc="\\x08",mc="]+",M="_",nc="amp",oc="annotatedtimeline",N="array",pc="base.js",qc="boolean",O="browserchart",rc="call",sc="callback after loading ",tc="charts",P="complete",uc="corechart",vc="div",wc="document",Q="dygraph",xc="e",yc="en",zc="end loadScript: ",Ac="error",R="function",Bc="g",Cc="get",Dc="goog",Ec="goog.loadModule(",Fc='goog.loadModule(function(exports) {"use strict";',Gc='goog.retrieveAndExecModule_("',
    Hc="goog_",Ic="google",Jc="google.charts.load",Kc="google.charts.load version ",Lc="gt",Mc="head",Nc="href",Oc="id",Pc="iframe",S="imagechart",Qc="javascript",Rc="link",Sc="load",Tc="load-css-",Uc="loadCSSFile: ",Vc="loadScript: ",Wc="loading css failed: ",Xc="lt",Yc="native code",Zc="none",$c="null",ad="number",bd="o",T="object",cd="onload",dd="quot",ed="rel",fd="removeAttribute",gd="script",hd="splice",id="string",jd="stylesheet",kd="text/css",ld="text/javascript",U="top",md="type",V="ui",nd="ui_base",
    od="unknown",pd="unknown type name",qd="var ",rd="var _evalTest_ = 1;",sd="visualization",td="webfontloader",ud="write",vd="{cssFile}",wd="{language}",xd="{package}",yd="{prefix}",zd="{prefix}/{version}/css/{cssFile}",Ad="{prefix}/{version}/third_party/{package}",Bd="{version}",Cd="|[",Dd="})",Ed="~",Fd="\u0080",Gd="\u010cesk\u00e1 republika",Hd="\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c",Id="\u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d",Jd="\u043c\u043e\u043d\u0433\u043e\u043b\u044c\u0441\u043a\u0438\u0439",
    Kd="\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576\u056b \u0540\u0561\u0576\u0580\u0561\u057a\u0565\u057f\u0578\u0582\u0569\u056b\u0582\u0576",Ld="\u0627\u0641\u063a\u0627\u0646\u0633\u062a\u0627\u0646",Md="\u0627\u0644\u0627\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629",Nd="\u0627\u0644\u0635\u062d\u0631\u0627\u0621 \u0627\u0644\u063a\u0631\u0628\u064a\u0629",Od="\u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629",
    Pd="\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629 \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u0629",Qd="\u062c\u0632\u0631 \u0627\u0644\u0642\u0645\u0631",Rd="\u067e\u0627\u06a9\u0633\u062a\u0627\u0646",W="\u092d\u093e\u0930\u0924",X="\u12a2\u1275\u12ee\u1335\u12eb",Sd="\uc870\uc120 \ubbfc\uc8fc\uc8fc\uc758 \uc778\ubbfc \uacf5\ud654\uad6d",Td="\ufffd";function Y(){return function(){}}var Z=Z||{};Z.global=this;Z.P=function(a){return void 0!==a};
    Z.Aa=function(a,c,d){a=a.split(r);d=d||Z.global;a[0]in d||!d.execScript||d.execScript(qd+a[0]);for(var e;a.length&&(e=a.shift());)!a.length&&Z.P(c)?d[e]=c:d=d[e]?d[e]:d[e]={}};Z.ue=function(a,c){Z.Aa(a,c)};Z.H=!0;Z.Cd=yc;Z.ra=!0;Z.ec=!1;Z.Ob=!Z.H;Z.Ya=!1;Z.Gf=function(a){if(Z.La())throw Error("goog.provide can not be used within a goog.module.");Z.fb(a)};Z.fb=function(a,c){Z.Aa(a,c)};Z.mc=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
    Z.Oa=function(a){if(!Z.h(a)||!a||-1==a.search(Z.mc))throw Error("Invalid module identifier");if(!Z.La())throw Error("Module "+a+" has been loaded incorrectly.");if(Z.j.Pa)throw Error("goog.module may only be called once per module.");Z.j.Pa=a};Z.Oa.get=Y();Z.Oa.Ge=Y();Z.j=null;Z.La=function(){return null!=Z.j};Z.Oa.xa=function(){Z.j.xa=!0};Z.Zf=function(a){if(Z.Ob)throw a=a||b,Error("Importing test-only code into non-debug environment"+(a?w+a:r));};Z.Be=Y();
    Z.kb=function(){for(var a=[Ic,tc,Sc],c=Z.global,d;d=a.shift();)if(Z.Ic(c[d]))c=c[d];else return null;return c};Z.Re=function(a,c){var d=c||Z.global,e;for(e in a)d[e]=a[e]};Z.Id=function(a,c,d,e){if(Z.Wa){var f;a=a.replace(/\\/g,u);var g=Z.i;e&&typeof e!==qc||(e=e?{module:Dc}:{});for(var h=0;f=c[h];h++)g.U[f]=a,g.Ra[a]=e.module==Dc;for(e=0;c=d[e];e++)a in g.G||(g.G[a]={}),g.G[a][c]=!0}};Z.yg=!1;Z.zd=!0;Z.uf=function(a){Z.global.console&&Z.global.console.error(a)};Z.Uf=Y();Z.F=b;Z.Bf=Y();
    Z.Hd=function(){throw Error("unimplemented abstract method");};Z.Jd=function(a){a.Fe=function(){if(a.vb)return a.vb;Z.H&&(Z.wb[Z.wb.length]=a);return a.vb=new a}};Z.wb=[];Z.Vb=!0;Z.cc=Z.H;Z.Sc={};Z.Wa=!1;
    Z.Wa&&(Z.i={Ra:{},U:{},G:{},Hb:{},qa:{},X:{}},Z.tb=function(){var a=Z.global.document;return null!=a&&ud in a},Z.Ac=function(){if(Z.P(Z.global.Lb))Z.F=Z.global.Lb;else if(Z.tb())for(var a=Z.global.document.getElementsByTagName(Jb),c=a.length-1;0<=c;--c){var d=a[c].src,e=d.lastIndexOf(Ma),e=-1==e?d.length:e;if(d.substr(e-7,7)==pc){Z.F=d.substr(0,e-7);break}}},Z.Ha=function(a,c){(Z.global.rd||Z.od)(a,c)&&(Z.i.qa[a]=!0)},Z.Ub=!(Z.global.atob||!Z.global.document||!Z.global.document.all),Z.Gc=function(a){Z.Ha(b,
        Gc+a+ha)&&(Z.i.qa[a]=!0)},Z.Sa=[],Z.Ag=function(a,c){return Z.Vb&&Z.P(Z.global.JSON)?Ec+Z.global.JSON.stringify(c+ca+a+ba)+xa:Fc+c+da+a+ba},Z.Rc=function(){var a=Z.Sa.length;if(0<a){var c=Z.Sa;Z.Sa=[];for(var d=0;d<a;d++)Z.Bb(c[d])}},Z.vf=function(a){Z.xb(a)&&Z.nc(a)&&Z.Bb(Z.F+Z.Ga(a))},Z.xb=function(a){return(a=Z.Ga(a))&&Z.i.Ra[a]?Z.F+a in Z.i.X:!1},Z.nc=function(a){if((a=Z.Ga(a))&&a in Z.i.G)for(var c in Z.i.G[a])if(!Z.Mc(c)&&!Z.xb(c))return!1;return!0},Z.Bb=function(a){if(a in Z.i.X){var c=Z.i.X[a];
        delete Z.i.X[a];Z.Fc(c)}},Z.tf=Y(),Z.sf=function(a){var c=Z.j;try{Z.j={Pa:void 0,xa:!1};var d;if(Z.yb(a))d=a.call(Z.global,{});else if(Z.h(a))d=Z.Pc.call(Z.global,a);else throw Error("Invalid module definition");var e=Z.j.Pa;if(!Z.h(e)||!e)throw Error('Invalid module name "'+e+l);Z.j.xa?Z.fb(e,d):Z.cc&&Object.seal&&Object.seal(d);Z.Sc[e]=d}finally{Z.j=c}},Z.Pc=function(a){eval(a);return{}},Z.md=function(a){Z.global.document.write(Ia+a+ia)},Z.pc=function(a){var c=Z.global.document,d=c.createElement(gd);
        d.type=ld;d.src=a;d.defer=!1;d.async=!1;c.head.appendChild(d)},Z.od=function(a,c){if(Z.tb()){var d=Z.global.document;if(!Z.Ya&&d.readyState==P){if(/\bdeps.js$/.test(a))return!1;throw Error('Cannot write "'+a+'" after document load');}var e=Z.Ub;void 0===c?e?(e=fa+ ++Z.zb+va,d.write(Ia+a+l+e+La)):Z.Ya?Z.pc(a):Z.md(a):d.write(Ja+c+Fa);return!0}return!1},Z.zb=0,Z.Df=function(a,c){a.readyState==P&&Z.zb==c&&Z.Rc();return!0},Z.Bg=function(a){function c(a){if(!(a in f.qa||a in f.Hb)){f.Hb[a]=!0;if(a in f.G)for(var g in f.G[a])if(!Z.Mc(g))if(g in
        f.U)c(f.U[g]);else throw Error("Undefined nameToPath for "+g);a in e||(e[a]=!0,d.push(a))}}var d=[],e={},f=Z.i;c(a);for(a=0;a<d.length;a++){var g=d[a];Z.i.qa[g]=!0}var h=Z.j;Z.j=null;for(a=0;a<d.length;a++)if(g=d[a])f.Ra[g]?Z.Gc(Z.F+g):Z.Ha(Z.F+g);else throw Z.j=h,Error("Undefined script input");Z.j=h},Z.Ga=function(a){return a in Z.i.U?Z.i.U[a]:null},Z.Ac(),Z.global.td||Z.Ha(Z.F+"deps.js"));
    Z.yf=function(a){a=a.split(u);for(var c=0;c<a.length;)a[c]==r?a.splice(c,1):c&&a[c]==Ba&&a[c-1]&&a[c-1]!=Ba?a.splice(--c,2):c++;return a.join(u)};Z.rf=function(a){if(Z.global.Mb)return Z.global.Mb(a);var c=new Z.global.XMLHttpRequest;c.open(Cc,a,!1);c.send();return c.responseText};Z.Vf=Y();
    Z.s=function(a){var c=typeof a;if(c==T)if(a){if(a instanceof Array)return N;if(a instanceof Object)return c;var d=Object.prototype.toString.call(a);if(d==gc)return T;if(d==ec||typeof a.length==ad&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable(hd))return N;if(d==fc||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable(rc))return R}else return $c;else if(c==R&&"undefined"==typeof a.call)return T;return c};
    Z.gf=function(a){return null===a};Z.Ic=function(a){return null!=a};Z.isArray=function(a){return Z.s(a)==N};Z.Ja=function(a){var c=Z.s(a);return c==N||c==T&&typeof a.length==ad};Z.bf=function(a){return Z.$(a)&&typeof a.getFullYear==R};Z.h=function(a){return typeof a==id};Z.Hc=function(a){return typeof a==qc};Z.Lc=function(a){return typeof a==ad};Z.yb=function(a){return Z.s(a)==R};Z.$=function(a){var c=typeof a;return c==T&&null!=a||c==R};Z.qb=function(a){return a[Z.D]||(a[Z.D]=++Z.hd)};Z.Se=function(a){return!!a[Z.D]};
    Z.Zc=function(a){null!==a&&fd in a&&a.removeAttribute(Z.D);try{delete a[Z.D]}catch(c){}};Z.D="closure_uid_"+(1E9*Math.random()>>>0);Z.hd=0;Z.De=Z.qb;Z.Rf=Z.Zc;Z.uc=function(a){var c=Z.s(a);if(c==T||c==N){if(a.clone)return a.clone();var c=c==N?[]:{},d;for(d in a)c[d]=Z.uc(a[d]);return c}return a};Z.tc=function(a,c,d){return a.call.apply(a.bind,arguments)};
    Z.rc=function(a,c,d){if(!a)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return a.apply(c,d)}}return function(){return a.apply(c,arguments)}};Z.bind=function(a,c,d){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf(Yc)?Z.bind=Z.tc:Z.bind=Z.rc;return Z.bind.apply(null,arguments)};
    Z.Wc=function(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return a.apply(this,c)}};Z.wf=function(a,c){for(var d in c)a[d]=c[d]};Z.now=Z.ra&&Date.now||function(){return+new Date};
    Z.Fc=function(a){if(Z.global.execScript)Z.global.execScript(a,mb);else if(Z.global.eval){if(null==Z.Y)if(Z.global.eval(rd),"undefined"!=typeof Z.global._evalTest_){try{delete Z.global._evalTest_}catch(e){}Z.Y=!0}else Z.Y=!1;if(Z.Y)Z.global.eval(a);else{var c=Z.global.document,d=c.createElement(Jb);d.type=ld;d.defer=!1;d.appendChild(c.createTextNode(a));c.body.appendChild(d);c.body.removeChild(d)}}else throw Error("goog.globalEval not available");};Z.Y=null;
    Z.Ce=function(a,c){function d(a){a=a.split(za);for(var c=[],d=0;d<a.length;d++)c.push(e(a[d]));return c.join(za)}function e(a){return Z.gb[a]||a}var f;f=Z.gb?Z.xc==Sa?e:d:function(a){return a};return c?a+za+f(c):f(a)};Z.Wf=function(a,c){Z.gb=a;Z.xc=c};Z.Je=function(a,c){c&&(a=a.replace(/\{\$([^}]+)}/g,function(a,e){return null!=c&&e in c?c[e]:a}));return a};Z.Ke=function(a){return a};Z.Ba=function(a,c){Z.Aa(a,c,void 0)};Z.ze=function(a,c,d){a[c]=d};
    Z.Ia=function(a,c){function d(){}d.prototype=c.prototype;a.oa=c.prototype;a.prototype=new d;a.prototype.constructor=a;a.qc=function(a,d,g){for(var h=Array(arguments.length-2),m=2;m<arguments.length;m++)h[m-2]=arguments[m];return c.prototype[d].apply(a,h)}};
    Z.qc=function(a,c,d){var e=arguments.callee.caller;if(Z.ec||Z.H&&!e)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if(e.oa){for(var f=Array(arguments.length-1),g=1;g<arguments.length;g++)f[g-1]=arguments[g];return e.oa.constructor.apply(a,f)}f=Array(arguments.length-2);for(g=2;g<arguments.length;g++)f[g-2]=arguments[g];for(var g=!1,h=a.constructor;h;h=h.oa&&h.oa.constructor)if(h.prototype[c]===
        e)g=!0;else if(g)return h.prototype[c].apply(a,f);if(a[c]===e)return a.constructor.prototype[c].apply(a,f);throw Error("goog.base called from a method of one name to a method of a different name");};Z.scope=function(a){if(Z.La())throw Error("goog.scope is not supported within a goog.module.");a.call(Z.global)};
    Z.u=function(a,c){var d=c.constructor,e=c.cd;d&&d!=Object.prototype.constructor||(d=function(){throw Error("cannot instantiate an interface (no constructor defined).");});d=Z.u.vc(d,a);a&&Z.Ia(d,a);delete c.constructor;delete c.cd;Z.u.$a(d.prototype,c);null!=e&&(e instanceof Function?e(d):Z.u.$a(d,e));return d};Z.u.bc=Z.H;
    Z.u.vc=function(a,c){if(Z.u.bc&&Object.seal instanceof Function){if(c&&c.prototype&&c.prototype[Z.kc])return a;var d=function(){var c=a.apply(this,arguments)||this;c[Z.D]=c[Z.D];this.constructor===d&&Object.seal(c);return c};return d}return a};Z.u.Za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    Z.u.$a=function(a,c){for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d]);for(var e=0;e<Z.u.Za.length;e++)d=Z.u.Za[e],Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])};Z.gg=Y();Z.kc="goog_defineClass_legacy_unsealable";Z.debug={};Z.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Z.debug.Error);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a))};Z.Ia(Z.debug.Error,Error);Z.debug.Error.prototype.name="CustomError";Z.hb={};Z.hb.$b={Pb:1,pd:2,Gd:3,qd:4,Bd:5,Ad:6,Fd:7,ud:8,wd:9,yd:10,xd:11,Dd:12};Z.c={};Z.c.Xa=!1;Z.c.Rb=!1;Z.c.lc={Yb:"\u00a0"};Z.c.startsWith=function(a,c){return 0==a.lastIndexOf(c,0)};Z.c.endsWith=function(a,c){var d=a.length-c.length;return 0<=d&&a.indexOf(c,d)==d};Z.c.je=function(a,c){return 0==Z.c.eb(c,a.substr(0,c.length))};Z.c.fe=function(a,c){return 0==Z.c.eb(c,a.substr(a.length-c.length,c.length))};Z.c.ge=function(a,c){return a.toLowerCase()==c.toLowerCase()};
    Z.c.dd=function(a,c){for(var d=a.split(la),e=b,f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join(la)};Z.c.le=function(a){return a.replace(/[\s\xa0]+/g,k).replace(/^\s+|\s+$/g,b)};Z.c.Ka=function(a){return/^[\s\xa0]*$/.test(a)};Z.c.df=function(a){return 0==a.length};Z.c.Jc=Z.c.Ka;Z.c.Kc=function(a){return Z.c.Ka(Z.c.Tc(a))};Z.c.cf=Z.c.Kc;Z.c.$e=function(a){return!/[^\t\n\r ]/.test(a)};Z.c.Ye=function(a){return!/[^a-zA-Z]/.test(a)};Z.c.hf=function(a){return!/[^0-9]/.test(a)};
    Z.c.Ze=function(a){return!/[^a-zA-Z0-9]/.test(a)};Z.c.lf=function(a){return a==k};Z.c.mf=function(a){return 1==a.length&&a>=k&&a<=Ed||a>=Fd&&a<=Td};Z.c.eg=function(a){return a.replace(/(\r\n|\r|\n)+/g,k)};Z.c.Yd=function(a){return a.replace(/(\r\n|\r|\n)/g,ba)};Z.c.Af=function(a){return a.replace(/\xa0|\s/g,k)};Z.c.zf=function(a){return a.replace(/\xa0|[ \t]+/g,k)};Z.c.ke=function(a){return a.replace(/[\t\r\n ]+/g,k).replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,b)};
    Z.c.trim=Z.ra&&String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,b)};Z.c.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,b)};Z.c.trimRight=function(a){return a.replace(/[\s\xa0]+$/,b)};Z.c.eb=function(a,c){var d=String(a).toLowerCase(),e=String(c).toLowerCase();return d<e?-1:d==e?0:1};
    Z.c.Db=function(a,c,d){if(a==c)return 0;if(!a)return-1;if(!c)return 1;for(var e=a.toLowerCase().match(d),f=c.toLowerCase().match(d),g=Math.min(e.length,f.length),h=0;h<g;h++){d=e[h];var m=f[h];if(d!=m)return a=parseInt(d,10),!isNaN(a)&&(c=parseInt(m,10),!isNaN(c)&&a-c)?a-c:d<m?-1:1}return e.length!=f.length?e.length-f.length:a<c?-1:1};Z.c.We=function(a,c){return Z.c.Db(a,c,/\d+|\D+/g)};Z.c.Dc=function(a,c){return Z.c.Db(a,c,/\d+|\.\d+|\D+/g)};Z.c.Cf=Z.c.Dc;Z.c.xg=function(a){return encodeURIComponent(String(a))};
    Z.c.wg=function(a){return decodeURIComponent(a.replace(/\+/g,k))};Z.c.Uc=function(a,c){return a.replace(/(\r\n|\r|\n)/g,c?Ga:Ha)};Z.c.rb=function(a){if(!Z.c.Jb.test(a))return a;-1!=a.indexOf(q)&&(a=a.replace(Z.c.Kb,pa));-1!=a.indexOf(x)&&(a=a.replace(Z.c.Xb,ra));-1!=a.indexOf(Ka)&&(a=a.replace(Z.c.Sb,qa));-1!=a.indexOf(l)&&(a=a.replace(Z.c.ac,sa));-1!=a.indexOf(ta)&&(a=a.replace(Z.c.dc,oa));-1!=a.indexOf(aa)&&(a=a.replace(Z.c.Zb,ma));Z.c.Xa&&-1!=a.indexOf(xc)&&(a=a.replace(Z.c.Qb,na));return a};
    Z.c.Kb=/&/g;Z.c.Xb=/</g;Z.c.Sb=/>/g;Z.c.ac=/"/g;Z.c.dc=/'/g;Z.c.Zb=/\x00/g;Z.c.Qb=/e/g;Z.c.Jb=Z.c.Xa?/[\x00&<>"'e]/:/[\x00&<>"']/;Z.c.Fb=function(a){return Z.c.contains(a,q)?!Z.c.Rb&&wc in Z.global?Z.c.Gb(a):Z.c.jd(a):a};Z.c.vg=function(a,c){return Z.c.contains(a,q)?Z.c.Gb(a,c):a};
    Z.c.Gb=function(a,c){var d={"&amp;":q,"&lt;":x,"&gt;":Ka,"&quot;":l},e;e=c?c.createElement(vc):Z.global.document.createElement(vc);return a.replace(Z.c.Tb,function(a,c){var h=d[a];if(h)return h;if(c.charAt(0)==ja){var m=Number(v+c.substr(1));isNaN(m)||(h=String.fromCharCode(m))}h||(e.innerHTML=a+k,h=e.firstChild.nodeValue.slice(0,-1));return d[a]=h})};
    Z.c.jd=function(a){return a.replace(/&([^;]+);/g,function(a,d){switch(d){case nc:return q;case Xc:return x;case Lc:return Ka;case dd:return l;default:if(d.charAt(0)==ja){var e=Number(v+d.substr(1));if(!isNaN(e))return String.fromCharCode(e)}return a}})};Z.c.Tb=/&([^;\s<&]+);?/g;Z.c.zg=function(a,c){return Z.c.Uc(a.replace(/  /g,ea),c)};Z.c.Ff=function(a){return a.replace(/(^|[\n ]) /g,ka+Z.c.lc.Yb)};
    Z.c.fg=function(a,c){for(var d=c.length,e=0;e<d;e++){var f=1==d?c:c.charAt(e);if(a.charAt(0)==f&&a.charAt(a.length-1)==f)return a.substring(1,a.length-1)}return a};Z.c.truncate=function(a,c,d){d&&(a=Z.c.Fb(a));a.length>c&&(a=a.substring(0,c-3)+Ca);d&&(a=Z.c.rb(a));return a};
    Z.c.rg=function(a,c,d,e){d&&(a=Z.c.Fb(a));if(e&&a.length>c)e>c&&(e=c),a=a.substring(0,c-e)+Ca+a.substring(a.length-e);else if(a.length>c){e=Math.floor(c/2);var f=a.length-e;a=a.substring(0,e+c%2)+Ca+a.substring(f)}d&&(a=Z.c.rb(a));return a};Z.c.Va={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":x};Z.c.ea={"'":"\\'"};
    Z.c.quote=function(a){a=String(a);for(var c=[l],d=0;d<a.length;d++){var e=a.charAt(d),f=e.charCodeAt(0);c[d+1]=Z.c.Va[e]||(31<f&&127>f?e:Z.c.ib(e))}c.push(l);return c.join(b)};Z.c.ye=function(a){for(var c=[],d=0;d<a.length;d++)c[d]=Z.c.ib(a.charAt(d));return c.join(b)};
    Z.c.ib=function(a){if(a in Z.c.ea)return Z.c.ea[a];if(a in Z.c.Va)return Z.c.ea[a]=Z.c.Va[a];var c=a,d=a.charCodeAt(0);if(31<d&&127>d)c=a;else{if(256>d){if(c=kc,16>d||256<d)c+=v}else c=jc,4096>d&&(c+=v);c+=d.toString(16).toUpperCase()}return Z.c.ea[a]=c};Z.c.contains=function(a,c){return-1!=a.indexOf(c)};Z.c.$d=function(a,c){return Z.c.contains(a.toLowerCase(),c.toLowerCase())};Z.c.qe=function(a,c){return a&&c?a.split(c).length-1:0};
    Z.c.L=function(a,c,d){var e=a;0<=c&&c<a.length&&0<d&&(e=a.substr(0,c)+a.substr(c+d,a.length-c-d));return e};Z.c.remove=function(a,c){var d=new RegExp(Z.c.Ta(c),b);return a.replace(d,b)};Z.c.Of=function(a,c){var d=new RegExp(Z.c.Ta(c),Bc);return a.replace(d,b)};Z.c.Ta=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,hc).replace(/\x08/g,lc)};Z.c.repeat=String.prototype.repeat?function(a,c){return a.repeat(c)}:function(a,c){return Array(c+1).join(a)};
    Z.c.Ef=function(a,c,d){a=Z.P(d)?a.toFixed(d):String(a);d=a.indexOf(r);-1==d&&(d=a.length);return Z.c.repeat(v,Math.max(0,c-d))+a};Z.c.Tc=function(a){return null==a?b:String(a)};Z.c.Xd=function(a){return Array.prototype.join.call(arguments,b)};Z.c.Ne=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Z.now()).toString(36)};
    Z.c.oe=function(a,c){for(var d=0,e=Z.c.trim(String(a)).split(r),f=Z.c.trim(String(c)).split(r),g=Math.max(e.length,f.length),h=0;0==d&&h<g;h++){var m=e[h]||b,n=f[h]||b,p=/(\d*)(\D*)/g,Oa=/(\d*)(\D*)/g;do{var A=p.exec(m)||[b,b,b],t=Oa.exec(n)||[b,b,b];if(0==A[0].length&&0==t[0].length)break;d=Z.c.ua(0==A[1].length?0:parseInt(A[1],10),0==t[1].length?0:parseInt(t[1],10))||Z.c.ua(0==A[2].length,0==t[2].length)||Z.c.ua(A[2],t[2])}while(0==d)}return d};Z.c.ua=function(a,c){return a<c?-1:a>c?1:0};
    Z.c.Te=function(a){for(var c=0,d=0;d<a.length;++d)c=31*c+a.charCodeAt(d)>>>0;return c};Z.c.kd=2147483648*Math.random()|0;Z.c.re=function(){return Hc+Z.c.kd++};Z.c.jg=function(a){var c=Number(a);return 0==c&&Z.c.Ka(a)?NaN:c};Z.c.ef=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};Z.c.nf=function(a){return/^([A-Z][a-z]*)+$/.test(a)};Z.c.hg=function(a){return String(a).replace(/\-([a-z])/g,function(a,d){return d.toUpperCase()})};Z.c.pg=function(a){return String(a).replace(/([A-Z])/g,Aa).toLowerCase()};
    Z.c.qg=function(a,c){var d=Z.h(c)?Z.c.Ta(c):ic;return a.replace(new RegExp(ua+(d?Cd+d+mc:b)+wa,Bc),function(a,c,d){return c+d.toUpperCase()})};Z.c.Zd=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};Z.c.parseInt=function(a){isFinite(a)&&(a=String(a));return Z.h(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};Z.c.cg=function(a,c,d){a=a.split(c);for(var e=[];0<d&&a.length;)e.push(a.shift()),d--;a.length&&e.push(a.join(c));return e};
    Z.c.qf=function(a,c){if(c)typeof c==id&&(c=[c]);else return a;for(var d=-1,e=0;e<c.length;e++)if(c[e]!=b){var f=a.lastIndexOf(c[e]);f>d&&(d=f)}return-1==d?a:a.slice(d+1)};Z.c.we=function(a,c){var d=[],e=[];if(a==c)return 0;if(!a.length||!c.length)return Math.max(a.length,c.length);for(var f=0;f<c.length+1;f++)d[f]=f;for(f=0;f<a.length;f++){e[0]=f+1;for(var g=0;g<c.length;g++)e[g+1]=Math.min(e[g]+1,d[g+1]+1,d[g]+Number(a[f]!=c[g]));for(g=0;g<d.length;g++)d[g]=e[g]}return e[c.length]};Z.g={};Z.g.o=Z.H;Z.g.V=function(a,c){c.unshift(a);Z.debug.Error.call(this,Z.c.dd.apply(null,c));c.shift()};Z.Ia(Z.g.V,Z.debug.Error);Z.g.V.prototype.name="AssertionError";Z.g.Nb=function(a){throw a;};Z.g.ya=Z.g.Nb;Z.g.A=function(a,c,d,e){var f=Ra;if(d)var f=f+(w+d),g=e;else a&&(f+=w+a,g=c);a=new Z.g.V(b+f,g||[]);Z.g.ya(a)};Z.g.Xf=function(a){Z.g.o&&(Z.g.ya=a)};Z.g.assert=function(a,c,d){Z.g.o&&!a&&Z.g.A(b,null,c,Array.prototype.slice.call(arguments,2));return a};
    Z.g.Ca=function(a,c){Z.g.o&&Z.g.ya(new Z.g.V(eb+(a?w+a:b),Array.prototype.slice.call(arguments,1)))};Z.g.Pd=function(a,c,d){Z.g.o&&!Z.Lc(a)&&Z.g.A(bb,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};Z.g.Sd=function(a,c,d){Z.g.o&&!Z.h(a)&&Z.g.A(db,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};Z.g.Nd=function(a,c,d){Z.g.o&&!Z.yb(a)&&Z.g.A($a,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};
    Z.g.Qd=function(a,c,d){Z.g.o&&!Z.$(a)&&Z.g.A(cb,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};Z.g.Kd=function(a,c,d){Z.g.o&&!Z.isArray(a)&&Z.g.A(Ya,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};Z.g.Ld=function(a,c,d){Z.g.o&&!Z.Hc(a)&&Z.g.A(Za,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};Z.g.Md=function(a,c,d){!Z.g.o||Z.$(a)&&a.nodeType==Z.hb.$b.Pb||Z.g.A(Xa,[Z.s(a),a],c,Array.prototype.slice.call(arguments,2));return a};
    Z.g.Od=function(a,c,d,e){!Z.g.o||a instanceof c||Z.g.A(ab,[Z.g.pb(c),Z.g.pb(a)],d,Array.prototype.slice.call(arguments,3));return a};Z.g.Rd=function(){for(var a in Object.prototype)Z.g.Ca(a+ga)};Z.g.pb=function(a){return a instanceof Function?a.displayName||a.name||pd:a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?$c:typeof a};Z.f={};Z.w=Z.ra;Z.f.v=!1;Z.f.Xc=function(a){return a[a.length-1]};Z.f.pf=Z.f.Xc;Z.f.indexOf=Z.w&&(Z.f.v||Array.prototype.indexOf)?function(a,c,d){return Array.prototype.indexOf.call(a,c,d)}:function(a,c,d){d=null==d?0:0>d?Math.max(0,a.length+d):d;if(Z.h(a))return Z.h(c)&&1==c.length?a.indexOf(c,d):-1;for(;d<a.length;d++)if(d in a&&a[d]===c)return d;return-1};
    Z.f.lastIndexOf=Z.w&&(Z.f.v||Array.prototype.lastIndexOf)?function(a,c,d){return Array.prototype.lastIndexOf.call(a,c,null==d?a.length-1:d)}:function(a,c,d){d=null==d?a.length-1:d;0>d&&(d=Math.max(0,a.length+d));if(Z.h(a))return Z.h(c)&&1==c.length?a.lastIndexOf(c,d):-1;for(;0<=d;d--)if(d in a&&a[d]===c)return d;return-1};
    Z.f.forEach=Z.w&&(Z.f.v||Array.prototype.forEach)?function(a,c,d){Array.prototype.forEach.call(a,c,d)}:function(a,c,d){for(var e=a.length,f=Z.h(a)?a.split(b):a,g=0;g<e;g++)g in f&&c.call(d,f[g],g,a)};Z.f.jb=function(a,c){for(var d=Z.h(a)?a.split(b):a,e=a.length-1;0<=e;--e)e in d&&c.call(void 0,d[e],e,a)};
    Z.f.filter=Z.w&&(Z.f.v||Array.prototype.filter)?function(a,c,d){return Array.prototype.filter.call(a,c,d)}:function(a,c,d){for(var e=a.length,f=[],g=0,h=Z.h(a)?a.split(b):a,m=0;m<e;m++)if(m in h){var n=h[m];c.call(d,n,m,a)&&(f[g++]=n)}return f};Z.f.map=Z.w&&(Z.f.v||Array.prototype.map)?function(a,c,d){return Array.prototype.map.call(a,c,d)}:function(a,c,d){for(var e=a.length,f=Array(e),g=Z.h(a)?a.split(b):a,h=0;h<e;h++)h in g&&(f[h]=c.call(d,g[h],h,a));return f};
    Z.f.reduce=Z.w&&(Z.f.v||Array.prototype.reduce)?function(a,c,d,e){e&&(c=Z.bind(c,e));return Array.prototype.reduce.call(a,c,d)}:function(a,c,d,e){var f=d;Z.f.forEach(a,function(d,h){f=c.call(e,f,d,h,a)});return f};Z.f.reduceRight=Z.w&&(Z.f.v||Array.prototype.reduceRight)?function(a,c,d,e){e&&(c=Z.bind(c,e));return Array.prototype.reduceRight.call(a,c,d)}:function(a,c,d,e){var f=d;Z.f.jb(a,function(d,h){f=c.call(e,f,d,h,a)});return f};
    Z.f.some=Z.w&&(Z.f.v||Array.prototype.some)?function(a,c,d){return Array.prototype.some.call(a,c,d)}:function(a,c,d){for(var e=a.length,f=Z.h(a)?a.split(b):a,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,a))return!0;return!1};Z.f.every=Z.w&&(Z.f.v||Array.prototype.every)?function(a,c,d){return Array.prototype.every.call(a,c,d)}:function(a,c,d){for(var e=a.length,f=Z.h(a)?a.split(b):a,g=0;g<e;g++)if(g in f&&!c.call(d,f[g],g,a))return!1;return!0};
    Z.f.count=function(a,c,d){var e=0;Z.f.forEach(a,function(a,g,h){c.call(d,a,g,h)&&++e},d);return e};Z.f.find=function(a,c,d){c=Z.f.findIndex(a,c,d);return 0>c?null:Z.h(a)?a.charAt(c):a[c]};Z.f.findIndex=function(a,c,d){for(var e=a.length,f=Z.h(a)?a.split(b):a,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,a))return g;return-1};Z.f.Ae=function(a,c,d){c=Z.f.Bc(a,c,d);return 0>c?null:Z.h(a)?a.charAt(c):a[c]};
    Z.f.Bc=function(a,c,d){for(var e=Z.h(a)?a.split(b):a,f=a.length-1;0<=f;f--)if(f in e&&c.call(d,e[f],f,a))return f;return-1};Z.f.contains=function(a,c){return 0<=Z.f.indexOf(a,c)};Z.f.Jc=function(a){return 0==a.length};Z.f.clear=function(a){if(!Z.isArray(a))for(var c=a.length-1;0<=c;c--)delete a[c];a.length=0};Z.f.Ue=function(a,c){Z.f.contains(a,c)||a.push(c)};Z.f.ub=function(a,c,d){Z.f.splice(a,d,0,c)};Z.f.Ve=function(a,c,d){Z.Wc(Z.f.splice,a,d,0).apply(null,c)};
    Z.f.insertBefore=function(a,c,d){var e;2==arguments.length||0>(e=Z.f.indexOf(a,d))?a.push(c):Z.f.ub(a,c,e)};Z.f.remove=function(a,c){var d=Z.f.indexOf(a,c),e;(e=0<=d)&&Z.f.L(a,d);return e};Z.f.Tf=function(a,c){var d=Z.f.lastIndexOf(a,c);return 0<=d?(Z.f.L(a,d),!0):!1};Z.f.L=function(a,c){return 1==Array.prototype.splice.call(a,c,1).length};Z.f.Sf=function(a,c,d){c=Z.f.findIndex(a,c,d);return 0<=c?(Z.f.L(a,c),!0):!1};
    Z.f.Pf=function(a,c,d){var e=0;Z.f.jb(a,function(f,g){c.call(d,f,g,a)&&Z.f.L(a,g)&&e++});return e};Z.f.concat=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};Z.f.join=function(a){return Array.prototype.concat.apply(Array.prototype,arguments)};Z.f.fd=function(a){var c=a.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=a[e];return d}return[]};Z.f.clone=Z.f.fd;
    Z.f.extend=function(a,c){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(Z.Ja(e)){var f=a.length||0,g=e.length||0;a.length=f+g;for(var h=0;h<g;h++)a[f+h]=e[h]}else a.push(e)}};Z.f.splice=function(a,c,d,e){return Array.prototype.splice.apply(a,Z.f.slice(arguments,1))};Z.f.slice=function(a,c,d){return 2>=arguments.length?Array.prototype.slice.call(a,c):Array.prototype.slice.call(a,c,d)};
    Z.f.Qf=function(a,c,d){function e(a){return Z.$(a)?bd+Z.qb(a):(typeof a).charAt(0)+a}c=c||a;d=d||e;for(var f={},g=0,h=0;h<a.length;){var m=a[h++],n=d(m);Object.prototype.hasOwnProperty.call(f,n)||(f[n]=!0,c[g++]=m)}c.length=g};Z.f.bb=function(a,c,d){return Z.f.cb(a,d||Z.f.B,!1,c)};Z.f.Vd=function(a,c,d){return Z.f.cb(a,c,!0,void 0,d)};Z.f.cb=function(a,c,d,e,f){for(var g=0,h=a.length,m;g<h;){var n=g+h>>1,p;p=d?c.call(f,a[n],n,a):c(e,a[n]);0<p?g=n+1:(h=n,m=!p)}return m?g:~g};
    Z.f.sort=function(a,c){a.sort(c||Z.f.B)};Z.f.dg=function(a,c){for(var d=Array(a.length),e=0;e<a.length;e++)d[e]={index:e,value:a[e]};var f=c||Z.f.B;Z.f.sort(d,function(a,c){return f(a.value,c.value)||a.index-c.index});for(e=0;e<a.length;e++)a[e]=d[e].value};Z.f.bd=function(a,c,d){var e=d||Z.f.B;Z.f.sort(a,function(a,d){return e(c(a),c(d))})};Z.f.ag=function(a,c,d){Z.f.bd(a,function(a){return a[c]},d)};
    Z.f.kf=function(a,c,d){c=c||Z.f.B;for(var e=1;e<a.length;e++){var f=c(a[e-1],a[e]);if(0<f||0==f&&d)return!1}return!0};Z.f.xe=function(a,c,d){if(!Z.Ja(a)||!Z.Ja(c)||a.length!=c.length)return!1;var e=a.length;d=d||Z.f.yc;for(var f=0;f<e;f++)if(!d(a[f],c[f]))return!1;return!0};Z.f.me=function(a,c,d){d=d||Z.f.B;for(var e=Math.min(a.length,c.length),f=0;f<e;f++){var g=d(a[f],c[f]);if(0!=g)return g}return Z.f.B(a.length,c.length)};Z.f.B=function(a,c){return a>c?1:a<c?-1:0};
    Z.f.Xe=function(a,c){return-Z.f.B(a,c)};Z.f.yc=function(a,c){return a===c};Z.f.Td=function(a,c,d){d=Z.f.bb(a,c,d);return 0>d?(Z.f.ub(a,c,-(d+1)),!0):!1};Z.f.Ud=function(a,c,d){c=Z.f.bb(a,c,d);return 0<=c?Z.f.L(a,c):!1};Z.f.Wd=function(a,c,d){for(var e={},f=0;f<a.length;f++){var g=a[f],h=c.call(d,g,f,a);Z.P(h)&&(e[h]||(e[h]=[])).push(g)}return e};Z.f.og=function(a,c,d){var e={};Z.f.forEach(a,function(f,g){e[c.call(d,f,g,a)]=f});return e};
    Z.f.Hf=function(a,c,d){var e=[],f=0,g=a;d=d||1;void 0!==c&&(f=a,g=c);if(0>d*(g-f))return[];if(0<d)for(a=f;a<g;a+=d)e.push(a);else for(a=f;a>g;a+=d)e.push(a);return e};Z.f.repeat=function(a,c){for(var d=[],e=0;e<c;e++)d[e]=a;return d};Z.f.Cc=function(a){for(var c=[],d=0;d<arguments.length;d++){var e=arguments[d];if(Z.isArray(e))for(var f=0;f<e.length;f+=8192)for(var g=Z.f.Cc.apply(null,Z.f.slice(e,f,f+8192)),h=0;h<g.length;h++)c.push(g[h]);else c.push(e)}return c};
    Z.f.rotate=function(a,c){a.length&&(c%=a.length,0<c?Array.prototype.unshift.apply(a,a.splice(-c,c)):0>c&&Array.prototype.push.apply(a,a.splice(0,-c)));return a};Z.f.xf=function(a,c,d){c=Array.prototype.splice.call(a,c,1);Array.prototype.splice.call(a,d,0,c[0])};
    Z.f.Cg=function(a){if(!arguments.length)return[];for(var c=[],d=arguments[0].length,e=1;e<arguments.length;e++)arguments[e].length<d&&(d=arguments[e].length);for(e=0;e<d;e++){for(var f=[],g=0;g<arguments.length;g++)f.push(arguments[g][e]);c.push(f)}return c};Z.f.$f=function(a,c){for(var d=c||Math.random,e=a.length-1;0<e;e--){var f=Math.floor(d()*(e+1)),g=a[e];a[e]=a[f];a[f]=g}};Z.f.pe=function(a,c){var d=[];Z.f.forEach(c,function(c){d.push(a[c])});return d};Z.locale={};
    Z.locale.J={COUNTRY:{AD:"Andorra",AE:Md,AF:Ld,AG:Qa,AI:"Anguilla",AL:"Shqip\u00ebria",AM:Kd,AN:wb,AO:"Angola",AQ:"Antarctica",AR:"Argentina",AS:Pa,AT:"\u00d6sterreich",AU:"Australia",AW:"Aruba",AX:"\u00c5land",AZ:"Az\u0259rbaycan",BA:z,BB:"Barbados",BD:"\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6",BE:"Belgi\u00eb",BF:"Burkina Faso",BG:"\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f",BH:"\u0627\u0644\u0628\u062d\u0631\u064a\u0646",BI:"Burundi",BJ:"B\u00e9nin",BM:"Bermuda",BN:"Brunei",BO:y,BR:"Brasil",
        BS:"Bahamas",BT:"\u092d\u0942\u091f\u093e\u0928",BV:"Bouvet Island",BW:Ta,BY:Hd,BZ:"Belize",CA:"Canada",CC:"Cocos (Keeling) Islands",CD:Ib,CF:Hb,CG:"Congo",CH:"Schweiz",CI:"C\u00f4te d\u2019Ivoire",CK:"Cook Islands",CL:"Chile",CM:"Cameroun",CN:"\u4e2d\u56fd",CO:"Colombia",CR:"Costa Rica",CS:Nb,CU:"Cuba",CV:"Cabo Verde",CX:Wa,CY:"\u039a\u03cd\u03c0\u03c1\u03bf\u03c2",CZ:Gd,DD:"East Germany",DE:"Deutschland",DJ:"Jabuuti",DK:"Danmark",DM:"Dominica",DO:Fb,DZ:"\u0627\u0644\u062c\u0632\u0627\u0626\u0631",
        EC:"Ecuador",EE:"Eesti",EG:"\u0645\u0635\u0631",EH:Nd,ER:"\u0627\u0631\u064a\u062a\u0631\u064a\u0627",ES:"Espa\u00f1a",ET:X,FI:"Suomi",FJ:"\u092b\u093f\u091c\u0940",FK:fb,FM:C,FO:"F\u00f8royar",FR:"France",FX:"Metropolitan France",GA:"Gabon",GB:$b,GD:"Grenada",GE:"\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd",GF:hb,GG:"Guernsey",GH:B,GI:"Gibraltar",GL:nb,GM:"Gambia",GN:"Guin\u00e9e",GP:"Guadeloupe",GQ:gb,GR:"\u0395\u03bb\u03bb\u03ac\u03b4\u03b1",GS:"South Georgia and the South Sandwich Islands",
        GT:"Guatemala",GU:"Guam",GW:"Guin\u00e9 Bissau",GY:"Guyana",HK:"\u9999\u6e2f",HM:"Heard Island and McDonald Islands",HN:jb,HR:"Hrvatska",HT:"Ha\u00efti",HU:"Magyarorsz\u00e1g",ID:kb,IE:"Ireland",IL:"\u05d9\u05e9\u05e8\u05d0\u05dc",IM:"Isle of Man",IN:W,IO:"British Indian Ocean Territory",IQ:"\u0627\u0644\u0639\u0631\u0627\u0642",IR:"\u0627\u06cc\u0631\u0627\u0646",IS:"\u00cdsland",IT:"Italia",JE:"Jersey",JM:"Jamaica",JO:"\u0627\u0644\u0623\u0631\u062f\u0646",JP:"\u65e5\u672c",KE:"Kenya",KG:Id,KH:"\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6",
        KI:ob,KM:Qd,KN:Kb,KP:Sd,KR:"\ub300\ud55c\ubbfc\uad6d",KW:"\u0627\u0644\u0643\u0648\u064a\u062a",KY:Va,KZ:"\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",LA:"\u0e25\u0e32\u0e27",LB:"\u0644\u0628\u0646\u0627\u0646",LC:"Saint Lucia",LI:"Liechtenstein",LK:"\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8",LR:"Liberia",LS:"Lesotho",LT:"Lietuva",LU:sb,LV:"Latvija",LY:"\u0644\u064a\u0628\u064a\u0627",MA:"\u0627\u0644\u0645\u063a\u0631\u0628",MC:"Monaco",MD:vb,ME:"\u0426\u0440\u043d\u0430 \u0413\u043e\u0440\u0430",
        MG:tb,MH:ub,MK:"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430",ML:"\u0645\u0627\u0644\u064a",MM:"Myanmar",MN:"\u8499\u53e4",MO:"\u6fb3\u95e8",MP:zb,MQ:"Martinique",MR:"\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627",MS:"Montserrat",MT:"Malta",MU:"Mauritius",MV:"Maldives",MW:"Malawi",MX:"M\u00e9xico",MY:"Malaysia",MZ:"Mo\u00e7ambique",NA:"Namibia",NC:Ab,NE:"Niger",NF:yb,NG:D,NI:"Nicaragua",NL:"Nederland",NO:"Norge",NP:"\u0928\u0947\u092a\u093e\u0932",NR:"Nauru",NT:"Neutral Zone",
        NU:"Niue",NZ:xb,OM:"\u0639\u0645\u0627\u0646",PA:"Panam\u00e1",PE:"Per\u00fa",PF:Db,PG:E,PH:Cb,PK:Rd,PL:"Polska",PM:Mb,PN:"Pitcairn",PR:Eb,PS:"\u0641\u0644\u0633\u0637\u064a\u0646",PT:"Portugal",PW:"Palau",PY:Bb,QA:"\u0642\u0637\u0631",QO:"Outlying Oceania",QU:"European Union",RE:"R\u00e9union",RO:"Rom\u00e2nia",RS:"\u0421\u0440\u0431\u0438\u0458\u0430",RU:"\u0420\u043e\u0441\u0441\u0438\u044f",RW:F,SA:Od,SB:Qb,SC:Ob,SD:"\u0627\u0644\u0633\u0648\u062f\u0627\u0646",SE:"Sverige",SG:"\u65b0\u52a0\u5761",
        SH:"Saint Helena",SI:"Slovenija",SJ:Rb,SK:Pb,SL:"Sierra Leone",SM:"San Marino",SN:H,SO:"Somali",SR:"Suriname",ST:Vb,SU:"Union of Soviet Socialist Republics",SV:"El Salvador",SY:"\u0633\u0648\u0631\u064a\u0627",SZ:Ub,TC:Yb,TD:"\u062a\u0634\u0627\u062f",TF:"French Southern Territories",TG:"Togo",TH:"\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22",TJ:"\u062a\u0627\u062c\u06cc\u06a9\u0633\u062a\u0627\u0646",TK:I,TL:Xb,TM:"\u0422\u0443\u0440\u043a\u043c\u0435\u043d\u0438\u0441\u0442\u0430\u043d",
        TN:"\u062a\u0648\u0646\u0633",TO:"Tonga",TR:K,TT:"Trinidad y Tobago",TV:J,TW:"\u53f0\u6e7e",TZ:Wb,UA:"\u0423\u043a\u0440\u0430\u0457\u043d\u0430",UG:"Uganda",UM:bc,US:ac,UY:"Uruguay",UZ:"\u040e\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u043e\u043d",VA:"Vaticano",VC:Lb,VE:"Venezuela",VG:Ua,VI:Zb,VN:"Vi\u1ec7t Nam",VU:L,WF:dc,WS:"Samoa",YD:"People's Democratic Republic of Yemen",YE:"\u0627\u0644\u064a\u0645\u0646",YT:"Mayotte",ZA:G,ZM:"Zambia",ZW:"Zimbabwe",ZZ:cc,aa_DJ:"Jabuuti",aa_ER:"\u00c9rythr\u00e9e",
        aa_ER_SAAHO:"\u00c9rythr\u00e9e",aa_ET:lb,af_NA:"Namibi\u00eb",af_ZA:"Suid-Afrika",ak_GH:B,am_ET:X,ar_AE:Md,ar_BH:"\u0627\u0644\u0628\u062d\u0631\u064a\u0646",ar_DJ:"\u062c\u064a\u0628\u0648\u062a\u064a",ar_DZ:"\u0627\u0644\u062c\u0632\u0627\u0626\u0631",ar_EG:"\u0645\u0635\u0631",ar_EH:Nd,ar_ER:"\u0627\u0631\u064a\u062a\u0631\u064a\u0627",ar_IL:"\u0627\u0633\u0631\u0627\u0626\u064a\u0644",ar_IQ:"\u0627\u0644\u0639\u0631\u0627\u0642",ar_JO:"\u0627\u0644\u0623\u0631\u062f\u0646",ar_KM:Qd,ar_KW:"\u0627\u0644\u0643\u0648\u064a\u062a",
        ar_LB:"\u0644\u0628\u0646\u0627\u0646",ar_LY:"\u0644\u064a\u0628\u064a\u0627",ar_MA:"\u0627\u0644\u0645\u063a\u0631\u0628",ar_MR:"\u0645\u0648\u0631\u064a\u062a\u0627\u0646\u064a\u0627",ar_OM:"\u0639\u0645\u0627\u0646",ar_PS:"\u0641\u0644\u0633\u0637\u064a\u0646",ar_QA:"\u0642\u0637\u0631",ar_SA:Od,ar_SD:"\u0627\u0644\u0633\u0648\u062f\u0627\u0646",ar_SY:"\u0633\u0648\u0631\u064a\u0627",ar_TD:"\u062a\u0634\u0627\u062f",ar_TN:"\u062a\u0648\u0646\u0633",ar_YE:"\u0627\u0644\u064a\u0645\u0646",as_IN:"\u09ad\u09be\u09f0\u09a4",
        ay_BO:y,az_AZ:"Az\u0259rbaycan",az_Cyrl_AZ:"\u0410\u0437\u04d9\u0440\u0431\u0430\u0458\u04b9\u0430\u043d",az_Latn_AZ:"Azerbaycan",be_BY:Hd,bg_BG:"\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f",bi_VU:L,bn_BD:"\u09ac\u09be\u0982\u09b2\u09be\u09a6\u09c7\u09b6",bn_IN:"\u09ad\u09be\u09b0\u09a4",bo_CN:"\u0f62\u0f92\u0fb1\u0f0b\u0f53\u0f42",bo_IN:"\u0f62\u0f92\u0fb1\u0f0b\u0f42\u0f62\u0f0b",bs_BA:z,byn_ER:"\u12a4\u122d\u1275\u122b",ca_AD:"Andorra",ca_ES:"Espanya",cch_NG:D,ch_GU:"Guam",chk_FM:C,cop_Arab_EG:"\u0645\u0635\u0631",
        cop_Arab_US:Pd,cop_EG:"\u0645\u0635\u0631",cop_US:Pd,cs_CZ:Gd,cy_GB:"Prydain Fawr",da_DK:"Danmark",da_GL:"Gr\u00f8nland",de_AT:"\u00d6sterreich",de_BE:"Belgien",de_CH:"Schweiz",de_DE:"Deutschland",de_LI:"Liechtenstein",de_LU:"Luxemburg",dv_MV:"Maldives",dz_BT:"Bhutan",ee_GH:B,ee_TG:"Togo",efi_NG:D,el_CY:"\u039a\u03cd\u03c0\u03c1\u03bf\u03c2",el_GR:"\u0395\u03bb\u03bb\u03ac\u03b4\u03b1",en_AG:Qa,en_AI:"Anguilla",en_AS:Pa,en_AU:"Australia",en_BB:"Barbados",en_BE:"Belgium",en_BM:"Bermuda",en_BS:"Bahamas",
        en_BW:Ta,en_BZ:"Belize",en_CA:"Canada",en_CC:"Cocos Islands",en_CK:"Cook Islands",en_CM:"Cameroon",en_CX:Wa,en_DM:"Dominica",en_FJ:"Fiji",en_FK:fb,en_FM:C,en_GB:$b,en_GD:"Grenada",en_GG:"Guernsey",en_GH:B,en_GI:"Gibraltar",en_GM:"Gambia",en_GU:"Guam",en_GY:"Guyana",en_HK:"Hong Kong",en_HN:jb,en_IE:"Ireland",en_IM:"Isle of Man",en_IN:"India",en_JE:"Jersey",en_JM:"Jamaica",en_KE:"Kenya",en_KI:ob,en_KN:Kb,en_KY:Va,en_LC:"Saint Lucia",en_LR:"Liberia",en_LS:"Lesotho",en_MH:ub,en_MP:zb,en_MS:"Montserrat",
        en_MT:"Malta",en_MU:"Mauritius",en_MW:"Malawi",en_NA:"Namibia",en_NF:yb,en_NG:D,en_NR:"Nauru",en_NU:"Niue",en_NZ:xb,en_PG:E,en_PH:Cb,en_PK:"Pakistan",en_PN:"Pitcairn",en_PR:Eb,en_RW:F,en_SB:Qb,en_SC:Ob,en_SG:"Singapore",en_SH:"Saint Helena",en_SL:"Sierra Leone",en_SZ:Ub,en_TC:Yb,en_TK:I,en_TO:"Tonga",en_TT:"Trinidad and Tobago",en_TV:J,en_TZ:Wb,en_UG:"Uganda",en_UM:bc,en_US:ac,en_US_POSIX:ac,en_VC:Lb,en_VG:Ua,en_VI:Zb,en_VU:L,en_WS:"Samoa",en_ZA:G,en_ZM:"Zambia",en_ZW:"Zimbabwe",es_AR:"Argentina",
        es_BO:y,es_CL:"Chile",es_CO:"Colombia",es_CR:"Costa Rica",es_CU:"Cuba",es_DO:Fb,es_EC:"Ecuador",es_ES:"Espa\u00f1a",es_GQ:"Guinea Ecuatorial",es_GT:"Guatemala",es_HN:jb,es_MX:"M\u00e9xico",es_NI:"Nicaragua",es_PA:"Panam\u00e1",es_PE:"Per\u00fa",es_PH:"Filipinas",es_PR:Eb,es_PY:Bb,es_SV:"El Salvador",es_US:"Estados Unidos",es_UY:"Uruguay",es_VE:"Venezuela",et_EE:"Eesti",eu_ES:"Espainia",fa_AF:Ld,fa_IR:"\u0627\u06cc\u0631\u0627\u0646",fi_FI:"Suomi",fil_PH:Cb,fj_FJ:"Fiji",fo_FO:"F\u00f8royar",fr_BE:"Belgique",
        fr_BF:"Burkina Faso",fr_BI:"Burundi",fr_BJ:"B\u00e9nin",fr_CA:"Canada",fr_CD:Ib,fr_CF:Hb,fr_CG:"Congo",fr_CH:"Suisse",fr_CI:"C\u00f4te d\u2019Ivoire",fr_CM:"Cameroun",fr_DJ:"Djibouti",fr_DZ:"Alg\u00e9rie",fr_FR:"France",fr_GA:"Gabon",fr_GF:hb,fr_GN:"Guin\u00e9e",fr_GP:"Guadeloupe",fr_GQ:gb,fr_HT:"Ha\u00efti",fr_KM:"Comores",fr_LU:sb,fr_MA:"Maroc",fr_MC:"Monaco",fr_MG:tb,fr_ML:"Mali",fr_MQ:"Martinique",fr_MU:"Maurice",fr_NC:Ab,fr_NE:"Niger",fr_PF:Db,fr_PM:Mb,fr_RE:"R\u00e9union",fr_RW:F,fr_SC:Ob,fr_SN:H,
        fr_SY:"Syrie",fr_TD:"Tchad",fr_TG:"Togo",fr_TN:"Tunisie",fr_VU:L,fr_WF:dc,fr_YT:"Mayotte",fur_IT:"Italia",ga_IE:"\u00c9ire",gaa_GH:B,gez_ER:"\u12a4\u122d\u1275\u122b",gez_ET:X,gil_KI:ob,gl_ES:"Espa\u00f1a",gn_PY:Bb,gu_IN:"\u0aad\u0abe\u0ab0\u0aa4",gv_GB:Gb,ha_Arab_NG:"\u0646\u064a\u062c\u064a\u0631\u064a\u0627",ha_GH:"\u063a\u0627\u0646\u0627",ha_Latn_GH:B,ha_Latn_NE:"Niger",ha_Latn_NG:"Nig\u00e9ria",ha_NE:"\u0627\u0644\u0646\u064a\u062c\u0631",ha_NG:"\u0646\u064a\u062c\u064a\u0631\u064a\u0627",haw_US:"\u02bbAmelika Hui P\u016b \u02bbIa",
        he_IL:"\u05d9\u05e9\u05e8\u05d0\u05dc",hi_IN:W,ho_PG:E,hr_BA:z,hr_HR:"Hrvatska",ht_HT:"Ha\u00efti",hu_HU:"Magyarorsz\u00e1g",hy_AM:Kd,hy_AM_REVISED:Kd,id_ID:kb,ig_NG:D,ii_CN:"\ua34f\ua1e9",is_IS:"\u00cdsland",it_CH:"Svizzera",it_IT:"Italia",it_SM:"San Marino",ja_JP:"\u65e5\u672c",ka_GE:"\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd",kaj_NG:D,kam_KE:"Kenya",kcg_NG:D,kfo_NG:"Nig\u00e9ria",kk_KZ:"\u049a\u0430\u0437\u0430\u049b\u0441\u0442\u0430\u043d",kl_GL:nb,km_KH:"\u1780\u1798\u17d2\u1796\u17bb\u1787\u17b6",
        kn_IN:"\u0cad\u0cbe\u0cb0\u0ca4",ko_KP:Sd,ko_KR:"\ub300\ud55c\ubbfc\uad6d",kok_IN:W,kos_FM:C,kpe_GN:"Guin\u00e9e",kpe_LR:"Lib\u00e9ria",ks_IN:W,ku_IQ:"Irak",ku_IR:"\u0130ran",ku_Latn_IQ:"Irak",ku_Latn_IR:"\u0130ran",ku_Latn_SY:"Suriye",ku_Latn_TR:K,ku_SY:"Suriye",ku_TR:K,kw_GB:Gb,ky_Cyrl_KG:Id,ky_KG:"K\u0131rg\u0131zistan",la_VA:"Vaticano",lb_LU:sb,ln_CD:Ib,ln_CG:"Kongo",lo_LA:"Laos",lt_LT:"Lietuva",lv_LV:"Latvija",mg_MG:tb,mh_MH:ub,mi_NZ:xb,mk_MK:"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430",
        ml_IN:"\u0d07\u0d28\u0d4d\u0d24\u0d4d\u0d2f",mn_Cyrl_MN:"\u041c\u043e\u043d\u0433\u043e\u043b\u0438\u044f",mn_MN:"\u041c\u043e\u043d\u0433\u043e\u043b\u0438\u044f",mr_IN:W,ms_BN:"Brunei",ms_MY:"Malaysia",ms_SG:"Singapura",mt_MT:"Malta",my_MM:"Myanmar",na_NR:"Nauru",nb_NO:"Norge",nb_SJ:Rb,ne_NP:"\u0928\u0947\u092a\u093e\u0932",niu_NU:"Niue",nl_AN:wb,nl_AW:"Aruba",nl_BE:"Belgi\u00eb",nl_NL:"Nederland",nl_SR:"Suriname",nn_NO:"Noreg",nr_ZA:G,nso_ZA:G,ny_MW:"Malawi",om_ET:lb,om_KE:"Keeniyaa",or_IN:"\u0b2d\u0b3e\u0b30\u0b24",
        pa_Arab_PK:Rd,pa_Guru_IN:"\u0a2d\u0a3e\u0a30\u0a24",pa_IN:"\u0a2d\u0a3e\u0a30\u0a24",pa_PK:Rd,pap_AN:wb,pau_PW:"Palau",pl_PL:"Polska",pon_FM:C,ps_AF:Ld,pt_AO:"Angola",pt_BR:"Brasil",pt_CV:"Cabo Verde",pt_GW:"Guin\u00e9 Bissau",pt_MZ:"Mo\u00e7ambique",pt_PT:"Portugal",pt_ST:Vb,pt_TL:Xb,qu_BO:y,qu_PE:"Per\u00fa",rm_CH:"Schweiz",rn_BI:"Burundi",ro_MD:vb,ro_RO:"Rom\u00e2nia",ru_BY:Hd,ru_KG:Id,ru_KZ:"\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",ru_RU:"\u0420\u043e\u0441\u0441\u0438\u044f",ru_UA:"\u0423\u043a\u0440\u0430\u0438\u043d\u0430",
        rw_RW:F,sa_IN:W,sd_Deva_IN:W,sd_IN:W,se_FI:"Finland",se_NO:"Norge",sg_CF:Hb,sh_BA:"Bosnia and Herzegovina",sh_CS:Nb,si_LK:"Sri Lanka",sid_ET:lb,sk_SK:Pb,sl_SI:"Slovenija",sm_AS:Pa,sm_WS:"Samoa",so_DJ:"Jabuuti",so_ET:"Itoobiya",so_KE:"Kiiniya",so_SO:"Soomaaliya",sq_AL:"Shqip\u00ebria",sr_BA:"\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430",sr_CS:"\u0421\u0440\u0431\u0438\u0458\u0430 \u0438 \u0426\u0440\u043d\u0430 \u0413\u043e\u0440\u0430",sr_Cyrl_BA:"\u0411\u043e\u0441\u043d\u0438\u044f",
        sr_Cyrl_CS:"\u0421\u0435\u0440\u0431\u0438\u044f \u0438 \u0427\u0435\u0440\u043d\u043e\u0433\u043e\u0440\u0438\u044f",sr_Cyrl_ME:"\u0427\u0435\u0440\u043d\u043e\u0433\u043e\u0440\u0438\u044f",sr_Cyrl_RS:"\u0421\u0435\u0440\u0431\u0438\u044f",sr_Latn_BA:z,sr_Latn_CS:"Srbija i Crna Gora",sr_Latn_ME:"Crna Gora",sr_Latn_RS:"Srbija",sr_ME:"\u0426\u0440\u043d\u0430 \u0413\u043e\u0440\u0430",sr_RS:"\u0421\u0440\u0431\u0438\u0458\u0430",ss_SZ:Ub,ss_ZA:G,st_LS:"Lesotho",st_ZA:G,su_ID:kb,sv_AX:"\u00c5land",
        sv_FI:"Finland",sv_SE:"Sverige",sw_KE:"Kenya",sw_TZ:Wb,sw_UG:"Uganda",swb_KM:Qd,syr_SY:"Syria",ta_IN:"\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe",ta_LK:"\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8",ta_SG:"\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd",te_IN:"\u0c2d\u0c3e\u0c30\u0c24 \u0c26\u0c47\u0c33\u0c02",tet_TL:Xb,tg_Cyrl_TJ:"\u0422\u0430\u0434\u0436\u0438\u043a\u0438\u0441\u0442\u0430\u043d",tg_TJ:"\u062a\u0627\u062c\u06a9\u0633\u062a\u0627\u0646",th_TH:"\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22",
        ti_ER:"\u12a4\u122d\u1275\u122b",ti_ET:X,tig_ER:"\u12a4\u122d\u1275\u122b",tk_TM:"\u062a\u0631\u06a9\u0645\u0646\u0633\u062a\u0627\u0646",tkl_TK:I,tn_BW:Ta,tn_ZA:G,to_TO:"Tonga",tpi_PG:E,tr_CY:"G\u00fcney K\u0131br\u0131s Rum Kesimi",tr_TR:K,ts_ZA:G,tt_RU:"\u0420\u043e\u0441\u0441\u0438\u044f",tvl_TV:J,ty_PF:Db,uk_UA:"\u0423\u043a\u0440\u0430\u0457\u043d\u0430",uli_FM:C,und_ZZ:cc,ur_IN:"\u0628\u06be\u0627\u0631\u062a",ur_PK:Rd,uz_AF:"Afganistan",uz_Arab_AF:Ld,uz_Cyrl_UZ:"\u0423\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u0430\u043d",
        uz_Latn_UZ:"O\u02bfzbekiston",uz_UZ:"\u040e\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u043e\u043d",ve_ZA:G,vi_VN:"Vi\u1ec7t Nam",wal_ET:X,wo_Arab_SN:"\u0627\u0644\u0633\u0646\u063a\u0627\u0644",wo_Latn_SN:H,wo_SN:H,xh_ZA:G,yap_FM:C,yo_NG:D,zh_CN:"\u4e2d\u56fd",zh_HK:"\u9999\u6e2f",zh_Hans_CN:"\u4e2d\u56fd",zh_Hans_SG:"\u65b0\u52a0\u5761",zh_Hant_HK:"\u4e2d\u83ef\u4eba\u6c11\u5171\u548c\u570b\u9999\u6e2f\u7279\u5225\u884c\u653f\u5340",zh_Hant_MO:"\u6fb3\u9580",zh_Hant_TW:"\u81fa\u7063",zh_MO:"\u6fb3\u95e8",
        zh_SG:"\u65b0\u52a0\u5761",zh_TW:"\u53f0\u6e7e",zu_ZA:G},LANGUAGE:{aa:"afar",ab:"\u0430\u0431\u0445\u0430\u0437\u0441\u043a\u0438\u0439",ace:"Aceh",ach:"Acoli",ada:"Adangme",ady:"\u0430\u0434\u044b\u0433\u0435\u0439\u0441\u043a\u0438\u0439",ae:"Avestan",af:"Afrikaans",afa:"Afro-Asiatic Language",afh:"Afrihili",ain:"Ainu",ak:"Akan",akk:"Akkadian",ale:"Aleut",alg:"Algonquian Language",alt:"Southern Altai",am:"\u12a0\u121b\u122d\u129b",an:"Aragonese",ang:"Old English",anp:"Angika",apa:"Apache Language",
        ar:"\u0627\u0644\u0639\u0631\u0628\u064a\u0629",arc:"Aramaic",arn:"Araucanian",arp:"Arapaho",art:"Artificial Language",arw:"Arawak",as:"\u0985\u09b8\u09ae\u09c0\u09af\u09bc\u09be",ast:"asturiano",ath:"Athapascan Language",aus:"Australian Language",av:"\u0430\u0432\u0430\u0440\u0441\u043a\u0438\u0439",awa:"Awadhi",ay:"aimara",az:"az\u0259rbaycanca",az_Arab:"\u062a\u0631\u06a9\u06cc \u0622\u0630\u0631\u0628\u0627\u06cc\u062c\u0627\u0646\u06cc",az_Cyrl:"\u0410\u0437\u04d9\u0440\u0431\u0430\u0458\u04b9\u0430\u043d",
        az_Latn:"Azerice",ba:"\u0431\u0430\u0448\u043a\u0438\u0440\u0441\u043a\u0438\u0439",bad:"Banda",bai:"Bamileke Language",bal:"\u0628\u0644\u0648\u0686\u06cc",ban:"Balin",bas:"Basa",bat:"Baltic Language",be:"\u0431\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f",bej:"Beja",bem:"Bemba",ber:"Berber",bg:"\u0431\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",bh:"\u092c\u093f\u0939\u093e\u0930\u0940",bho:"Bhojpuri",bi:"bichelamar ; bislama",bik:"Bikol",bin:"Bini",bla:"Siksika",bm:"bambara",bn:"\u09ac\u09be\u0982\u09b2\u09be",
        bnt:"Bantu",bo:"\u0f54\u0f7c\u0f51\u0f0b\u0f66\u0f90\u0f51\u0f0b",br:"breton",bra:"Braj",bs:"Bosanski",btk:"Batak",bua:"Buriat",bug:"Bugis",byn:"\u1265\u120a\u1295",ca:"catal\u00e0",cad:"Caddo",cai:"Central American Indian Language",car:"Carib",cau:"Caucasian Language",cch:"Atsam",ce:"\u0447\u0435\u0447\u0435\u043d\u0441\u043a\u0438\u0439",ceb:"Cebuano",cel:"Celtic Language",ch:"Chamorro",chb:"Chibcha",chg:"Chagatai",chk:"Chuukese",chm:"\u043c\u0430\u0440\u0438\u0439\u0441\u043a\u0438\u0439 (\u0447\u0435\u0440\u0435\u043c\u0438\u0441\u0441\u043a\u0438\u0439)",
        chn:"Chinook Jargon",cho:"Choctaw",chp:"Chipewyan",chr:"Cherokee",chy:"Cheyenne",cmc:"Chamic Language",co:"corse",cop:"\u0642\u0628\u0637\u064a\u0629",cop_Arab:"\u0642\u0628\u0637\u064a\u0629",cpe:"English-based Creole or Pidgin",cpf:"French-based Creole or Pidgin",cpp:"Portuguese-based Creole or Pidgin",cr:"Cree",crh:"Crimean Turkish",crp:"Creole or Pidgin",cs:"\u010de\u0161tina",csb:"Kashubian",cu:"Church Slavic",cus:"Cushitic Language",cv:"\u0447\u0443\u0432\u0430\u0448\u0441\u043a\u0438\u0439",
        cy:"Cymraeg",da:"dansk",dak:"Dakota",dar:"\u0434\u0430\u0440\u0433\u0432\u0430",day:"Dayak",de:"Deutsch",del:"Delaware",den:"Slave",dgr:"Dogrib",din:"Dinka",doi:"\u0627\u0644\u062f\u0648\u062c\u0631\u0649",dra:"Dravidian Language",dsb:"Lower Sorbian",dua:"Duala",dum:"Middle Dutch",dv:"Divehi",dyu:"dioula",dz:"\u0f62\u0fab\u0f7c\u0f44\u0f0b\u0f41",ee:"Ewe",efi:"Efik",egy:"Ancient Egyptian",eka:"Ekajuk",el:"\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",elx:"Elamite",en:"English",enm:"Middle English",
        eo:"esperanto",es:"espa\u00f1ol",et:"eesti",eu:"euskara",ewo:"Ewondo",fa:"\u0641\u0627\u0631\u0633\u06cc",fan:"fang",fat:"Fanti",ff:"Fulah",fi:"suomi",fil:"Filipino",fiu:"Finno-Ugrian Language",fj:"Fijian",fo:"f\u00f8royskt",fon:"Fon",fr:"fran\u00e7ais",frm:"Middle French",fro:"Old French",frr:"Northern Frisian",frs:"Eastern Frisian",fur:"friulano",fy:"Fries",ga:"Gaeilge",gaa:"Ga",gay:"Gayo",gba:"Gbaya",gd:"Scottish Gaelic",gem:"Germanic Language",gez:"\u130d\u12d5\u12dd\u129b",gil:"Gilbertese",gl:"galego",
        gmh:"Middle High German",gn:"guaran\u00ed",goh:"Old High German",gon:"Gondi",gor:"Gorontalo",got:"Gothic",grb:"Grebo",grc:"\u0391\u03c1\u03c7\u03b1\u03af\u03b1 \u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",gsw:"Schweizerdeutsch",gu:"\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",gv:"Gaelg",gwi:"Gwich\u02bcin",ha:"\u0627\u0644\u0647\u0648\u0633\u0627",ha_Arab:"\u0627\u0644\u0647\u0648\u0633\u0627",ha_Latn:"haoussa",hai:"Haida",haw:"\u02bb\u014dlelo Hawai\u02bbi",he:"\u05e2\u05d1\u05e8\u05d9\u05ea",
        hi:"\u0939\u093f\u0902\u0926\u0940",hil:"Hiligaynon",him:"Himachali",hit:"Hittite",hmn:"Hmong",ho:"Hiri Motu",hr:"hrvatski",hsb:"Upper Sorbian",ht:"ha\u00eftien",hu:"magyar",hup:"Hupa",hy:"\u0540\u0561\u0575\u0565\u0580\u0567\u0576",hz:"Herero",ia:"interlingvao",iba:"Iban",id:"Bahasa Indonesia",ie:"Interlingue",ig:"Igbo",ii:"\ua188\ua320\ua259",ijo:"Ijo",ik:"Inupiaq",ilo:"Iloko",inc:"Indic Language",ine:"Indo-European Language",inh:"\u0438\u043d\u0433\u0443\u0448\u0441\u043a\u0438\u0439",io:"Ido",
        ira:"Iranian Language",iro:"Iroquoian Language",is:"\u00edslenska",it:"italiano",iu:"Inuktitut",ja:"\u65e5\u672c\u8a9e",jbo:"Lojban",jpr:"Judeo-Persian",jrb:"Judeo-Arabic",jv:"Jawa",ka:"\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8",kaa:"\u043a\u0430\u0440\u0430\u043a\u0430\u043b\u043f\u0430\u043a\u0441\u043a\u0438\u0439",kab:"kabyle",kac:"Kachin",kaj:"Jju",kam:"Kamba",kar:"Karen",kaw:"Kawi",kbd:"\u043a\u0430\u0431\u0430\u0440\u0434\u0438\u043d\u0441\u043a\u0438\u0439",kcg:"Tyap",kfo:"koro",kg:"Kongo",
        kha:"Khasi",khi:"Khoisan Language",kho:"Khotanese",ki:"Kikuyu",kj:"Kuanyama",kk:"\u049a\u0430\u0437\u0430\u049b",kl:"kalaallisut",km:"\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",kmb:"quimbundo",kn:"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1",ko:"\ud55c\uad6d\uc5b4",kok:"\u0915\u094b\u0902\u0915\u0923\u0940",kos:"Kosraean",kpe:"kpell\u00e9",kr:"Kanuri",krc:"\u043a\u0430\u0440\u0430\u0447\u0430\u0435\u0432\u043e-\u0431\u0430\u043b\u043a\u0430\u0440\u0441\u043a\u0438\u0439",krl:"\u043a\u0430\u0440\u0435\u043b\u044c\u0441\u043a\u0438\u0439",
        kro:"Kru",kru:"Kurukh",ks:"\u0915\u093e\u0936\u094d\u092e\u093f\u0930\u0940",ku:"K\u00fcrt\u00e7e",ku_Arab:"\u0627\u0644\u0643\u0631\u062f\u064a\u0629",ku_Latn:"K\u00fcrt\u00e7e",kum:"\u043a\u0443\u043c\u044b\u043a\u0441\u043a\u0438\u0439",kut:"Kutenai",kv:"Komi",kw:"kernewek",ky:"K\u0131rg\u0131zca",ky_Arab:"\u0627\u0644\u0642\u064a\u0631\u063a\u0633\u062a\u0627\u0646\u064a\u0629",ky_Cyrl:"\u043a\u0438\u0440\u0433\u0438\u0437\u0441\u043a\u0438\u0439",la:"latino",lad:"\u05dc\u05d3\u05d9\u05e0\u05d5",
        lah:"\u0644\u0627\u0647\u0646\u062f\u0627",lam:"Lamba",lb:"luxembourgeois",lez:"\u043b\u0435\u0437\u0433\u0438\u043d\u0441\u043a\u0438\u0439",lg:"Ganda",li:"Limburgs",ln:"lingala",lo:"Lao",lol:"mongo",loz:"Lozi",lt:"lietuvi\u0173",lu:"luba-katanga",lua:"luba-lulua",lui:"Luiseno",lun:"Lunda",luo:"Luo",lus:"Lushai",lv:"latvie\u0161u",mad:"Madura",mag:"Magahi",mai:"Maithili",mak:"Makassar",man:"Mandingo",map:"Austronesian",mas:"Masai",mdf:"\u043c\u043e\u043a\u0448\u0430",mdr:"Mandar",men:"Mende",mg:"malgache",
        mga:"Middle Irish",mh:"Marshallese",mi:"Maori",mic:"Micmac",min:"Minangkabau",mis:"Miscellaneous Language",mk:"\u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438",mkh:"Mon-Khmer Language",ml:"\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",mn:Jd,mn_Cyrl:Jd,mn_Mong:Jd,mnc:"Manchu",mni:"Manipuri",mno:"Manobo Language",mo:"Moldavian",moh:"Mohawk",mos:"mor\u00e9 ; mossi",mr:"\u092e\u0930\u093e\u0920\u0940",ms:"Bahasa Melayu",mt:"Malti",mul:"Multiple Languages",mun:"Munda Language",mus:"Creek",mwl:"Mirandese",
        mwr:"Marwari",my:"Burmese",myn:"Mayan Language",myv:"\u044d\u0440\u0437\u044f",na:"Nauru",nah:"Nahuatl",nai:"North American Indian Language",nap:"napoletano",nb:"norsk bokm\u00e5l",nd:"North Ndebele",nds:"Low German",ne:"\u0928\u0947\u092a\u093e\u0932\u0940","new":"Newari",ng:"Ndonga",nia:"Nias",nic:"Niger-Kordofanian Language",niu:"Niuean",nl:"Nederlands",nn:"nynorsk",no:"Norwegian",nog:"\u043d\u043e\u0433\u0430\u0439\u0441\u043a\u0438\u0439",non:"Old Norse",nqo:"N\u2019Ko",nr:"South Ndebele",nso:"Northern Sotho",
        nub:"Nubian Language",nv:"Navajo",nwc:"Classical Newari",ny:"nianja; chicheua; cheua",nym:"Nyamwezi",nyn:"Nyankole",nyo:"Nyoro",nzi:"Nzima",oc:"occitan",oj:"Ojibwa",om:"Oromoo",or:"\u0b13\u0b21\u0b3c\u0b3f\u0b06",os:"\u043e\u0441\u0435\u0442\u0438\u043d\u0441\u043a\u0438\u0439",osa:"Osage",ota:"Ottoman Turkish",oto:"Otomian Language",pa:"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",pa_Arab:"\u067e\u0646\u062c\u0627\u0628",pa_Guru:"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",paa:"Papuan Language",pag:"Pangasinan",
        pal:"Pahlavi",pam:"Pampanga",pap:"Papiamento",pau:"Palauan",peo:"Old Persian",phi:"Philippine Language",phn:"Phoenician",pi:"\u0e1a\u0e32\u0e25\u0e35",pl:"polski",pon:"Pohnpeian",pra:"Prakrit Language",pro:"Old Proven\u00e7al",ps:"\u067e\u069a\u062a\u0648",pt:"portugu\u00eas",qu:"quechua",raj:"Rajasthani",rap:"Rapanui",rar:"Rarotongan",rm:"R\u00e4toromanisch",rn:"roundi",ro:"rom\u00e2n\u0103",roa:"Romance Language",rom:"Romany",ru:"\u0440\u0443\u0441\u0441\u043a\u0438\u0439",rup:"Aromanian",rw:"rwanda",
        sa:"\u0938\u0902\u0938\u094d\u0915\u0943\u0924 \u092d\u093e\u0937\u093e",sad:"Sandawe",sah:"\u044f\u043a\u0443\u0442\u0441\u043a\u0438\u0439",sai:"South American Indian Language",sal:"Salishan Language",sam:"\u05d0\u05e8\u05de\u05d9\u05ea \u05e9\u05d5\u05de\u05e8\u05d5\u05e0\u05d9\u05ea",sas:"Sasak",sat:"Santali",sc:"Sardinian",scn:"siciliano",sco:"Scots",sd:"\u0938\u093f\u0928\u094d\u0927\u0940",sd_Arab:"\u0633\u0646\u062f\u06cc",sd_Deva:"\u0938\u093f\u0928\u094d\u0927\u0940",se:"nordsamiska",sel:"\u0441\u0435\u043b\u044c\u043a\u0443\u043f\u0441\u043a\u0438\u0439",
        sem:"Semitic Language",sg:"sangho",sga:"Old Irish",sgn:"Sign Language",sh:"Serbo-Croatian",shn:"Shan",si:"Sinhalese",sid:"Sidamo",sio:"Siouan Language",sit:"Sino-Tibetan Language",sk:"slovensk\u00fd",sl:"sloven\u0161\u010dina",sla:"Slavic Language",sm:"Samoan",sma:"sydsamiska",smi:"Sami Language",smj:"lulesamiska",smn:"Inari Sami",sms:"Skolt Sami",sn:"Shona",snk:"sonink\u00e9",so:"Soomaali",sog:"Sogdien",son:"Songhai",sq:"shqipe",sr:"\u0421\u0440\u043f\u0441\u043a\u0438",sr_Cyrl:"\u0441\u0435\u0440\u0431\u0441\u043a\u0438\u0439",
        sr_Latn:"Srpski",srn:"Sranantongo",srr:"s\u00e9r\u00e8re",ss:"Swati",ssa:"Nilo-Saharan Language",st:"Sesotho",su:"Sundan",suk:"Sukuma",sus:"soussou",sux:"Sumerian",sv:"svenska",sw:"Kiswahili",syc:"Classical Syriac",syr:"Syriac",ta:"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd",tai:"Tai Language",te:"\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",tem:"Timne",ter:"Tereno",tet:"t\u00e9tum",tg:"\u062a\u0627\u062c\u06a9",tg_Arab:"\u062a\u0627\u062c\u06a9",tg_Cyrl:"\u0442\u0430\u0434\u0436\u0438\u043a\u0441\u043a\u0438\u0439",
        th:"\u0e44\u0e17\u0e22",ti:"\u1275\u130d\u122d\u129b",tig:"\u1275\u130d\u1228",tiv:"Tiv",tk:"\u062a\u0631\u06a9\u0645\u0646\u06cc",tkl:I,tl:"Tagalog",tlh:"Klingon",tli:"Tlingit",tmh:"tamacheq",tn:"Tswana",to:"Tonga",tog:"Nyasa Tonga",tpi:"Tok Pisin",tr:"T\u00fcrk\u00e7e",ts:"Tsonga",tsi:"Tsimshian",tt:"\u0442\u0430\u0442\u0430\u0440\u0441\u043a\u0438\u0439",tum:"Tumbuka",tup:"Tupi Language",tut:"\u0430\u043b\u0442\u0430\u0439\u0441\u043a\u0438\u0435 (\u0434\u0440\u0443\u0433\u0438\u0435)",tvl:J,tw:"Twi",
        ty:"tahitien",tyv:"\u0442\u0443\u0432\u0438\u043d\u0441\u043a\u0438\u0439",udm:"\u0443\u0434\u043c\u0443\u0440\u0442\u0441\u043a\u0438\u0439",ug:"\u0443\u0439\u0433\u0443\u0440\u0441\u043a\u0438\u0439",uga:"Ugaritic",uk:"\u0443\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",umb:"umbundu",und:"English",ur:"\u0627\u0631\u062f\u0648",uz:"\u040e\u0437\u0431\u0435\u043a",uz_Arab:"\u0627\u06c9\u0632\u0628\u06d0\u06a9",uz_Cyrl:"\u0443\u0437\u0431\u0435\u043a\u0441\u043a\u0438\u0439",uz_Latn:"o'zbekcha",
        vai:"Vai",ve:"Venda",vi:"Ti\u1ebfng Vi\u1ec7t",vo:"volapuko",vot:"Votic",wa:"Wallonisch",wak:"Wakashan Language",wal:"Walamo",war:"Waray",was:"Washo",wen:"Sorbian Language",wo:"wolof",wo_Arab:"\u0627\u0644\u0648\u0644\u0648\u0641",wo_Latn:"wolof",xal:"\u043a\u0430\u043b\u043c\u044b\u0446\u043a\u0438\u0439",xh:"Xhosa",yao:"iao",yap:"Yapese",yi:"\u05d9\u05d9\u05d3\u05d9\u05e9",yo:"Yoruba",ypk:"Yupik Language",za:"Zhuang",zap:"Zapotec",zen:"Zenaga",zh:"\u4e2d\u6587",zh_Hans:"\u4e2d\u6587",zh_Hant:"\u4e2d\u6587",
        znd:"Zande",zu:"Zulu",zun:"Zuni",zxx:"No linguistic content",zza:"Zaza"}};Z.locale.Yf=function(a){a=a.replace(/-/g,M);Z.locale.N=a};Z.locale.Fa=function(){Z.locale.N||(Z.locale.N=yc);return Z.locale.N};Z.locale.I={vd:"DateTimeConstants",Ed:"NumberFormatConstants",gc:"TimeZoneConstants",Wb:rb,hc:"TimeZoneSelectedIds",jc:"TimeZoneSelectedShortNames",ic:"TimeZoneSelectedLongNames",fc:"TimeZoneAllLongNames"};Z.locale.Ea=function(a){return(a=a.match(/^\w{2,3}([-_]|$)/))?a[0].replace(/[_-]/g,b):b};
    Z.locale.mb=function(a){return(a=a.match(/[-_]([a-zA-Z]{2}|\d{3})([-_]|$)/))?a[0].replace(/[_-]/g,b):b};Z.locale.Pe=function(a){a=a.split(/[-_]/g);return 1<a.length&&a[1].match(/^[a-zA-Z]{4}$/)?a[1]:b};Z.locale.Qe=function(a){return(a=a.match(/[-_]([a-z]{2,})/))?a[1]:b};Z.locale.Le=function(a){var c=Z.locale.Ea(a)+M+Z.locale.mb(a);return c in Z.locale.J.COUNTRY?Z.locale.J.COUNTRY[c]:a};Z.locale.He=function(a,c){c||(c=Z.locale.ob());var d=Z.locale.mb(a);return d in c.COUNTRY?c.COUNTRY[d]:a};
    Z.locale.Me=function(a){if(a in Z.locale.J.LANGUAGE)return Z.locale.J.LANGUAGE[a];var c=Z.locale.Ea(a);return c in Z.locale.J.LANGUAGE?Z.locale.J.LANGUAGE[c]:a};Z.locale.Ie=function(a,c){c||(c=Z.locale.ob());if(a in c.LANGUAGE)return c.LANGUAGE[a];var d=Z.locale.Ea(a);return d in c.LANGUAGE?c.LANGUAGE[d]:a};Z.locale.K=function(a,c,d){Z.locale.l[c]||(Z.locale.l[c]={});Z.locale.l[c][d]=a;Z.locale.N||(Z.locale.N=d)};Z.locale.jf=function(a,c){return a in Z.locale.l&&c in Z.locale.l[a]};Z.locale.l={};
    Z.locale.Kf=function(a,c){Z.locale.K(a,Z.locale.I.gc,c)};Z.locale.If=function(a,c){Z.locale.K(a,Z.locale.I.Wb,c)};Z.locale.Lf=function(a,c){Z.locale.K(a,Z.locale.I.hc,c)};Z.locale.Nf=function(a,c){Z.locale.K(a,Z.locale.I.jc,c)};Z.locale.Mf=function(a,c){Z.locale.K(a,Z.locale.I.ic,c)};Z.locale.Jf=function(a,c){Z.locale.K(a,Z.locale.I.fc,c)};Z.locale.ob=function(){var a=Z.locale.Fa(),a=a?a:Z.locale.Fa();return rb in Z.locale.l?Z.locale.l.LocaleNameConstants[a]:void 0};
    Z.locale.Oe=function(a,c){var d=c?c:Z.locale.Fa();if(a in Z.locale.l){if(d in Z.locale.l[a])return Z.locale.l[a][d];d=d.split(M);return 1<d.length&&d[0]in Z.locale.l[a]?Z.locale.l[a][d[0]]:Z.locale.l[a].en}};var google={a:{}};google.a.b={};
    google.a.b.languages={af:!0,am:!0,az:!0,ar:!0,arb:"ar",bg:!0,bn:!0,ca:!0,cs:!0,cmn:"zh",da:!0,de:!0,el:!0,en:!0,en_gb:!0,es:!0,es_419:!0,et:!0,eu:!0,fa:!0,fi:!0,fil:!0,fr:!0,fr_ca:!0,gl:!0,ka:!0,gu:!0,he:"iw",hi:!0,hr:!0,hu:!0,hy:!0,id:!0,"in":Oc,is:!0,it:!0,iw:!0,ja:!0,ji:"yi",jv:!1,jw:"jv",km:!0,kn:!0,ko:!0,lo:!0,lt:!0,lv:!0,ml:!0,mn:!0,mo:"ro",mr:!0,ms:!0,nb:"no",ne:!0,nl:!0,no:!0,pl:!0,pt:"pt_br",pt_br:!0,pt_pt:!0,ro:!0,ru:!0,si:!0,sk:!0,sl:!0,sr:!0,sv:!0,sw:!0,swh:"sw",ta:!0,te:!0,th:!0,tl:"fil",
        tr:!0,uk:!0,ur:!0,vi:!0,yi:!1,zh:"zh_cn",zh_cn:!0,zh_hk:!0,zh_tw:!0,zsm:"ms",zu:!0};google.a.b.S={};google.a.b.T=od;google.a.b.log=Y();google.a.b.error=Y();google.a.b.Z=!1;google.a.b.O=window;google.a.b.ld={current:"44",upcoming:"44",41:U,42:U,43:U,44:U};google.a.b.Ua={gstatic:{prefix:"https://www.gstatic.com/charts",debug:"{prefix}/debug/{version}/jsapi_debug_{package}_module.js",compiled:"{prefix}/{version}/js/jsapi_compiled_{package}_module.js",i18n:"{prefix}/{version}/i18n/jsapi_compiled_i18n_{package}_module__{language}.js",css:zd,css_debug:zd,third_party:Ad,third_party_gen:Ad}};
    google.a.b.m=google.a.b.Ua.gstatic;
    google.a.b.zc={"default":[],format:[],ui:["format","default"],ui_base:["format","default"],annotatedtimeline:[V],annotationchart:[V,"controls",uc,"table"],areachart:[V,O],bar:[V,Q,td],barchart:[V,O],browserchart:[V],calendar:[V],charteditor:[V,uc,S,oc,"gauge","motionchart","orgchart","table"],charteditor_base:[nd,uc,S,oc,"gauge","motionchart","orgchart","table_base"],columnchart:[V,O],controls:[V],controls_base:[nd],corechart:[V],gantt:[V,Q],gauge:[V],geochart:[V],geomap:[V],geomap_base:[nd],helloworld:[V],
        imageareachart:[V,S],imagebarchart:[V,S],imagelinechart:[V,S],imagechart:[V],imagepiechart:[V,S],imagesparkline:[V,S],intensitymap:[V],line:[V,Q,td],linechart:[V,O],map:[V],motionchart:[V],orgchart:[V],overtimecharts:[V,uc],piechart:[V,O],sankey:["d3","d3.sankey",V],scatter:[V,Q,td],scatterchart:[V,O],table:[V],table_base:[nd],timeline:[V,Q],treemap:[V],wordtree:[V]};google.a.b.ed={d3:"d3/d3.js","d3.sankey":"d3/d3.sankey.js",webfontloader:"webfontloader/webfont.js"};google.a.b.Eb={dygraph:"dygraphs/dygraph-tickers-combined.js"};
    google.a.b.wc={annotatedtimeline:"/annotatedtimeline/annotatedtimeline.css",annotationchart:"annotationchart/annotationchart.css",charteditor:"charteditor/charteditor.css",charteditor_base:"charteditor/charteditor_base.css",controls:"controls/controls.css",imagesparkline:"imagesparkline/imagesparkline.css",intensitymap:"intensitymap/intensitymap.css",orgchart:"orgchart/orgchart.css",table:"table/table.css",table_base:"table/table_base.css",ui:["util/util.css","core/tooltip.css"],ui_base:"util/util_base.css"};
    google.a.b.va=function(a,c){for(var d=c||{},e=[],f=0;f<a.length;f++){var g=a[f];if(!d[g]){d[g]=!0;var h=google.a.b.zc[g]||[];0<h.length&&(e=e.concat(google.a.b.va(h,d)));e.push(g)}}return e};google.a.b.Ec=function(a){for(var c={},d=[],e=0;e<a.length;e++){var f=google.a.b.wc[a[e]];Z.isArray(f)||(f=[f]);for(var g=0;g<f.length;g++){var h=f[g];h&&!c[h]&&(c[h]=!0,d.push(h))}}return d};
    google.a.b.$c=function(a,c){if(c)if("undefined"===typeof a.onload){var d=!1;a.onreadystatechange=function(){d||(a.readyState&&a.readyState!==P?google.a.b.O.setTimeout(a.onreadystatechange,0):(d=!0,delete a.onreadystatechange,google.a.b.O.setTimeout(c,0)))}}else a.onload=c};
    google.a.b.Ab=function(a,c,d){google.a.b.log(Vc+a);var e=c.createElement(gd);e.type=ld;e.language=Qc;e.async=!1;e.defer=!1;c=c.body||c.head||c.getElementsByTagName(ib).item(0)||c.documentElement;c.insertBefore(e,c.lastChild);d&&google.a.b.$c(e,d);e.src=a;google.a.b.log(zc+a)};
    google.a.b.Qc=function(a,c){function d(c){var e=google.a.b.sb,f=a[c++];if(f){var g=f,h=google.a.b.ed[f];h?(g=h,f===td&&(e=window.document),f=google.a.b.m.third_party):google.a.b.Eb[f]?(g=google.a.b.Eb[f],f=google.a.b.m.third_party_gen):f=google.a.b.Z?n:t?Oa:p;g=f.replace(yd,m).replace(Bd,A).replace(wd,t).replace(xd,g);google.a.b.Ab(g,e);d(c)}}function e(){for(var d=[],e=0;e<a.length;e++)d.push(Sb[a[e]]);eval(Ea+d.join(b)+Dd)();google.a.b.O.setTimeout(c,0)}a=google.a.b.va(a);for(var f=[],g=0;g<a.length;g++){var h=
        a[g];google.a.b.S[h]||f.push(h)}a=f;google.a.b.log(pb+a);var m=google.a.b.m.prefix,n=google.a.b.m.debug,p=google.a.b.m.compiled,Oa=google.a.b.m.i18n,A=google.a.b.T,t=google.a.b.Ma;t===yc&&(t=null);var Sb={},Tb=a.length;google.a.b.Vc=function(a,c){google.a.b.log(sc+a);Sb[a]=c;google.a.b.S[a]=!0;Tb--;0===Tb&&e()};d(0)};
    google.a.b.W=function(a){function c(){g=!0;for(var a=e.length,c=0;c<a;c++)e[c]()}function d(){h=!0;for(var a=f.length,c=0;c<a;c++)f[c]()}var e=[],f=[],g=!1,h=!1;google.a.b.W.count||(google.a.b.W.count=0);var m=Tc+google.a.b.W.count++,n={done:function(a){e.push(a);g&&a();return n},Ca:function(a){f.push(a);h&&a();return n}},p=document.createElement(Rc);p.setAttribute(Oc,m);p.setAttribute(ed,jd);p.setAttribute(md,kd);"undefined"!==typeof p.addEventListener?(p.addEventListener(Sc,c,!1),p.addEventListener(Ac,
        d,!1)):"undefined"!==typeof p.attachEvent&&p.attachEvent(cd,function(){var a,e=document.styleSheets.length;try{for(;e--;)if(a=document.styleSheets[e],a.id===m){c();return}}catch(f){}g||d()});document.getElementsByTagName(Mc)[0].appendChild(p);p.setAttribute(Nc,a);return n};google.a.b.Nc=function(a,c){google.a.b.log(Uc+a);google.a.b.W(a).done(c).Ca(function(){google.a.b.error(Wc+a)})};
    google.a.b.Oc=function(a,c){a=google.a.b.va(a);var d=google.a.b.Ec(a);if(null===d||0===d.length)c();else{google.a.b.log(qb+d.join(ya));var e=google.a.b.m.prefix,f=google.a.b.m.css;google.a.b.Z&&(f=google.a.b.m.css_debug||f);var g=google.a.b.T,h=function(a){var n=d[a],p;p=a<d.length-1?function(){h(a+1)}:c;google.a.b.S[n]?(google.a.b.log(Na+n),google.a.b.O.setTimeout(p,0)):(google.a.b.S[n]=!0,n=f.replace(yd,e).replace(Bd,g).replace(vd,n),google.a.b.Nc(n,p))};h(0)}};
    google.a.b.Ee=function(){var a=google.a.b.C;if(!a){a=google.a.b.C=document.createElement(Pc);google.a.b.C=a;a.name=Jc;(document.body||document.head||document).appendChild(a);a.style.display=Zc;var c=google.a.b.sb=a.contentDocument?a.contentDocument:a.contentWindow?a.contentWindow.document:a.document;c.open();c.writeln(b);c.close()}return a};
    google.a.b.Cb=function(a){for(var c=a.replace(/-/g,M).toLowerCase();Z.h(c);)a=c,c=google.a.b.languages[c],c===a&&(c=!1);c||(a.match(/_[^_]+$/)?(a=a.replace(/_[^_]+$/,b),a=google.a.b.Cb(a)):a=yc);return a};
    google.a.b.Yc=function(a,c){c.log&&(google.a.b.log=c.log);c.error&&(google.a.b.error=c.error);var d=c.debug,e=c.language||b,e=google.a.b.Cb(e);a||(a=c.version||od);(google.a.b.T&&google.a.b.T!==a||google.a.b.Ma&&google.a.b.Ma!==e||google.a.b.Z!==d)&&google.a.b.C&&google.a.b.C.parentNode&&(google.a.b.C.parentNode.removeChild(google.a.b.C),google.a.b.C=null,google.a.b.S={});google.a.b.T=a;google.a.b.Ma=e;google.a.b.Z=d};google.a.b.R=!1;google.a.b.ma=!1;google.a.b.loaded=!1;google.a.b.Da=[];
    google.a.b.load=function(a,c,d){var e;e=a.match(/^(testing\/)?(.*)/);var f=e[1]||b;for(a=e[2];;){e=google.a.b.ld[a];if(null==e||e===U)break;a=e}google.a.b.m=d||google.a.b.Ua[a]||google.a.b.Ua.gstatic;a=f+a;if(null==e)f=function(){Z.kb()(a,c,d)},google.a.b.R?google.a.b.M(f):(google.a.b.R=!0,google.a.b.Ab(google.a.b.m.prefix+u+a+Da,window.document,f));else{if(google.a.b.R)throw Error("google.charts.load() cannot be called more than once with version 44 or earlier.");google.a.b.R=!0;if(google.a.b.ma)google.a.b.M(function(){google.a.b.load(a,
        c)});else{google.a.b.loaded=!1;google.a.b.ma=!0;google.a.b.Yc(a,c);google.a.b.log(Kc+a);window.google=window.google||{};google.visualization=google.visualization||{};google.visualization.ModulePath=google.a.b.m.prefix;google.a.b.C=null;google.a.b.O=window;google.a.b.sb=document;var g=function(){google.a.b.ma=!1;google.a.b.loaded=!0;google.a.b.Na()},h=c.packages;google.a.b.M(c.callback);google.a.b.Oc(h,function(){google.a.b.Qc(h,g)})}}};
    google.a.b.M=function(a){a&&google.a.b.Da.push(a);google.a.b.loaded&&!google.a.b.ma&&google.a.b.Na()};google.a.b.ad=function(a){if(window.addEventListener)window.addEventListener(Sc,a,!1);else if(window.attachEvent)window.attachEvent(cd,a);else{var c=window.onload;window.onload=function(d){c&&c(d);a()}}};google.a.b.Ib=document&&document.readyState===P;google.a.b.ad(function(){google.a.b.Ib=!0;google.a.b.Na()});
    google.a.b.Na=function(){if(google.a.b.R&&google.a.b.loaded&&(google.a.b.Ib||document.readyState===P))for(;0<google.a.b.Da.length;)google.a.b.Da.shift()()};google.a.b.Qa=function(a,c){google.a.b.Vc(a,c)};if(Z.kb())throw Error("Google Charts loader.js can only be loaded once.");google.a.load=function(a,c,d){a===sd&&(a=c,c=d);google.a.b.load(String(a),c||{})};google.a.M=function(a){google.a.b.M(a)};google.a.Qa=function(a,c){google.a.b.Qa(a,c)};Z.Ba(Jc,google.a.load);Z.Ba("google.charts.setOnLoadCallback",google.a.M);Z.Ba("google.charts.packageLoadedCallback",google.a.Qa); })();
//# sourceMappingURL=plugins.js.map
