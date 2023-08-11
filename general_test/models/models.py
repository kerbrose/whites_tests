from odoo import api, fields, models


class AccountPayment(models.Model):
    _inherit = 'account.payment'

    def allocate_by_first_outstanding(self):
        for p in self:
            lines = p.line_ids.filtered(lambda l: l.account_id == p.destination_account_id)
            lines += self.env['account.move.line'].search([
                ('account_id', '=', lines[0].account_id.id),
                ('partner_id', '=', p.partner_id.id),
                ('reconciled', '!=', True),
            ])
            return lines.reconcile()
