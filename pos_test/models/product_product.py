from odoo import api, fields, models


class ProductProduct(models.Model):
    _inherit = 'product.product'

    code2 = fields.Char('Ref2')


class PosOrderLine(models.Model):
    _inherit = "pos.order.line"

    product_code2 = fields.Char(related='product_id.code2')
