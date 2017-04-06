define(["require", "exports", "ibas/index"], function (require, exports, ibas) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataConverterOnline extends ibas.DataConverter4ibas {
        createConverter() {
            return new InitialFantasyBOConverter();
        }
    }
    exports.DataConverterOnline = DataConverterOnline;
    class InitialFantasyBOConverter extends ibas.BOConverter {
        customParsing(data) {
            return data;
        }
        convertData(boName, property, value) {
            return value;
        }
        parsingData(boName, property, value) {
            return super.parsingData(boName, property, value);
        }
    }
    class DataConverterOffline {
        convert(data, sign) {
            return data;
        }
        parsing(data, sign) {
            return data;
        }
    }
    exports.DataConverterOffline = DataConverterOffline;
});
