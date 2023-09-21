'use strict';

let status = {
  new: 'new',
  initiated: 'initiated',
  pending: 'pending',
  expired: 'expired',
  failed: 'failed',
  dropped: 'dropped',
  cancelled: 'cancelled',
  paid: 'paid',
  captured: 'captured',
  reversed: 'reversed',
  awaitingReview: 'awaiting-review',
  closed: 'closed'
};

module.exports = {
  status: status,
  reservedStatus: [status.new, status.initiated, status.pending, status.paid],
  confirmedStatus: [status.paid],
  settableStatus: [status.new, status.pending, status.dropped, status.paid],
  paymentMethod: {
    cod: 'cod',
    bankTransfer: 'bankTransfer',
    easypay: 'easypay',
    jazzCash: 'jazzCash',
    safepay: 'safepay'
  }
};
