odoo.define("pos_test.db", function (require) {
    "use strict";

    var PosDB = require("point_of_sale.DB");

    PosDB.include({
        _product_search_string: function (product) {
            var str = product.display_name;
            if (product.barcode) {
                str += "|" + product.barcode;
            }
            if (product.default_code) {
                str += "|" + product.default_code;
            }
            if (product.description) {
                str += "|" + product.description;
            }
            if (product.description_sale) {
                str += "|" + product.description_sale;
            }
            if (product.code2) {
                str += "|" + product.code2;
            }
            str = product.id + ":" + str.replace(/[\n:]/g, "") + "\n";
            return str;
        },
    });
});

odoo.define("pos_test.productitem", function (require) {
    "use strict";

    const productitem = require("point_of_sale.ProductItem");
    const Registries = require("point_of_sale.Registries");

    const ProductItemS = (productitem) =>
        class extends productitem {
            async andrewtate(event) {
                const { confirmed } = await this.showPopup("ConfirmPopup", {
                    title: "hello",
                    body: "hello",
                });
                if (confirmed) {
                    this.trigger("click-product", this.props.product);
                }
            }
        };

    Registries.Component.extend(productitem, ProductItemS);

    return productitem;
});

odoo.define("pos_test.receipt", function (require) {
    "use strict";

    var models = require("point_of_sale.models");

    models.load_fields("product.product", "code2");

    var _super_orderline = models.Orderline.prototype;
    models.Orderline = models.Orderline.extend({
        export_for_printing: function () {
            var line = _super_orderline.export_for_printing.apply(this, arguments);
            line.code2 = this.get_product().code2;
            return line;
        },
    });
});
