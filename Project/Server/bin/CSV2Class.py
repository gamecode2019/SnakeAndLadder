#coding=utf-8
import os
import codecs

# <summary>
# 创建csv管理器.
# </summary>
# <param name="manager_root">Manager root.</param>
# <param name="includes">Includes.</param>
# <param name="variables">Variables.</param>
# <param name="prototypes">Prototypes.</param>
def _create_csvmanager(manager_root, includes, variables, prototypes):
    #管理器源码模版
    manager_template = """
// Auto-generate code, PLEASE DON'T MOIDIFY.
%svar _singleton = null;\n
var CSVManager = function() {\n%s};\n
CSVManager.Instance = function() {
    if (_singleton === null) { _singleton = new CSVManager(); }
    return _singleton;
};

%s
exports.Instance = CSVManager.Instance;
"""
    #写入代码
    manager_path = os.path.join(manager_root, 'csv_manager.js')
    manager_file = codecs.open(manager_path, 'w', 'utf-8')
    manager_file.write(manager_template % (''.join(includes), ''.join(variables), ''.join(prototypes)))
    manager_file.close()

# <summary>
# 创建配置对应表类.
# </summary>
# <param name="config_root">config root path.</param>
# <param name="table_root">table root path.</param>
# <param name="item_file">config file.</param>
def _create_table_class(config_root, table_root, item_file):
    table_template = """
// Auto-generate code, PLEASE DON'T MOIDIFY.
var csvParse = autoload('core/csvreader');
var _singleton = null;\n
var %s = function() {\n%s};\n
var %sTable = function() {
    this._lines = {};
    var tmpArr = csvParse.config_csv_tables.%s;
    for (var i = 0; i < tmpArr.length; ++i) {
        var obj = new %s();\n%s
        this._lines[%s] = obj;
    }
};\n
%sTable.Instance = function() {
    if (_singleton === null) {_singleton = new %sTable();}
    return _singleton;
};\n
%sTable.prototype.GetLines = function() {
    return this._lines;
};\n
module.exports = %sTable;
"""
    # 创建表类文件
    fname = item_file.split(".")[0]
    table = codecs.open(os.path.join(table_root, fname + '.js'), 'w', "utf-8")

    # 读取配置文件
    config = codecs.open(os.path.join(config_root, item_file), 'r', "utf-8")
    line = config.readline().strip()
    line_meta = line.split(",")
    line_number = len(line_meta)
    # line = config.readline().strip()
    # line_top = line.split(",")
    # config.readline().strip()
    # line = config.readline().strip()
    # line_area = line.split(",")

    #遍历配置文件
    table_b1 = []
    table_b2 = []
    table_meta = ''
    for index in range(line_number):
        # if len(line_area) <= index:
        #     print("out of range")
        #     continue

        if index == 0:
            table_meta = 'tmpArr[i].%s' %(line_meta[index])
        # elif line_area[index] != '1' and line_area[index] != '2' :
        #     continue

        # if line_top[index] == 'INT':
        #     table_b1.append('\tthis.%s = 0;\n' %(line_meta[index]))
        #     table_b2.append('\t\tobj.%s = parseInt(tmpArr[i].%s);\n' %(line_meta[index],line_meta[index]))
        #     table_b2.append('\t\tif (isNaN(obj.%s)) console.error("%s" + i + "%s");\n' %(line_meta[index],fname,line_meta[index]))
        # elif line_top[index] == 'FLOAT':
        #     table_b1.append('\tthis.%s = 0;\n' %(line_meta[index]))
        #     table_b2.append('\t\tobj.%s = parseFloat(tmpArr[i].%s);\n' %(line_meta[index],line_meta[index]))
        #     table_b2.append('\t\tif (isNaN(obj.%s)) console.error("%s" + i + "%s");\n' %(line_meta[index],fname,line_meta[index]))
        # elif line_top[index] == 'STRING':
        # else:
        
        table_b1.append("\tthis.%s = '';\n" %(line_meta[index]))
        # table_b2.append('\t\tif (tmpArr[i].%s === "0") {\n' %(line_meta[index]))
        # table_b2.append('\t\t\tobj.%s = "";\n' %(line_meta[index]))
        # table_b2.append('\t\t} else {\n')
        table_b2.append('\t\t\tobj.%s = tmpArr[i].%s;\n' %(line_meta[index],line_meta[index]))
        # table_b2.append('\t\t}\n')

    # 写入代码
    table.write(table_template %(fname, ''.join(table_b1), fname, fname, fname, ''.join(table_b2), table_meta, fname, fname, fname, fname))
    table.close()
    config.close()

# <summary>
# Main functions.
# </summary>
if __name__ == "__main__":

    #创建配置目录
    config_root = os.path.join(os.getcwd(), '../resources/config')
    if not os.path.isdir(config_root): 
        os.makedirs(config_root)

    # 创建表目录
    table_root = os.path.join(os.getcwd(), "../library/manager", "csv_manager")
    if not os.path.isdir(table_root): 
        os.makedirs(table_root)

    # 创建管理器目录
    manager_root = os.path.join(os.getcwd(), "../library", "manager")
    if not os.path.isdir(manager_root):
        os.makedirs(manager_root)

    # 遍历配置文件信息
    includes = []
    variables = []
    prototypes = []
    for root, subdirs, files in os.walk(config_root):
        for item_file in files:
            if(item_file.find('.csv') == -1): continue
            item_name = item_file.split(".")[0]
            print(item_name)
            includes.append("var csv%s = require('./csv_manager/%s');\n" %(item_name.upper(), item_name))
            variables.append("\tthis._%s = csv%s.Instance;\n" %(item_name,item_name.upper()))
            prototypes.append("CSVManager.prototype.%s = function() {\n\treturn this._%s().GetLines();\n};\n\n" %(item_name,item_name))
            _create_table_class(root, table_root, item_file)

    # 创建管理器
    _create_csvmanager(manager_root, includes, variables, prototypes)


































