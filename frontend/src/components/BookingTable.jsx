import { useState } from 'react'
import { FiTrash2, FiDownload, FiShare2, FiGrid, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function BookingTable({ bookings, onCancel, showUser = false }) {
  const [selectedTicket, setSelectedTicket] = useState(null)

  const getTicketQrSrc = booking => {
    const seed = `Ticket:${booking.ticketCode || `#${booking.id}`};Event:${booking.eventTitle};Date:${booking.eventDate} ${booking.eventTime || ''};Tickets:${booking.ticketCount}`
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(seed)}`
  }

  const handleShareBooking = async booking => {
    const shareUrl = `${window.location.origin}/events/${booking.eventId}`
    const shareText = `${booking.ticketCode || `Ticket #${booking.id}`} for ${booking.eventTitle} on ${booking.eventDate}`
    const shareData = { title: booking.eventTitle, text: shareText, url: shareUrl }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch (err) {
        // ignored
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
      toast.success('Ticket link copied to clipboard')
    } else {
      window.prompt('Copy ticket link', `${shareText}\n${shareUrl}`)
    }
  }

  const handleDownloadQr = booking => {
    const link = document.createElement('a')
    link.href = getTicketQrSrc(booking)
    link.download = `${booking.ticketCode || `ticket-${booking.id}`}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!bookings?.length) {
    return (
      <div className="empty-state">
        <p style={{ fontSize: 48 }}>🎫</p>
        <h3>No bookings found</h3>
        <p>Your bookings will appear here</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper glass" style={{ padding: 0 }}>
      <table>
        <thead>
          <tr>
            {showUser && <th>User</th>}
            <th>Event</th>
            <th>Date</th>
            <th>Tickets</th>
            <th>Total</th>
            <th>Status</th>
            {onCancel && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              {showUser && <td>{b.userName || '—'}</td>}
              <td>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{b.eventTitle}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.eventLocation}</div>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}><strong>Ticket:</strong> {b.ticketCode || `#${b.id}`}</span>
                </div>
              </td>
              <td>{b.eventDate}</td>
              <td>{b.ticketCount}</td>
              <td style={{ fontWeight: 600, color: 'var(--success)' }}>₹{b.totalPrice}</td>
              <td>
                <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-success' : 'badge-danger'}`}>
                  {b.bookingStatus}
                </span>
              </td>
              {onCancel && (
                <td>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {String(b.bookingStatus).toUpperCase() === 'CONFIRMED' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedTicket(b)}
                          className="btn btn-secondary btn-sm"
                        >
                          <FiGrid size={13} /> View Ticket
                        </button>
                        <button
                          type="button"
                          onClick={() => handleShareBooking(b)}
                          className="btn btn-secondary btn-sm"
                        >
                          <FiShare2 size={13} /> Share
                        </button>
                      </>
                    )}
                    {String(b.bookingStatus).toUpperCase() === 'CONFIRMED' && (
                      <button
                        onClick={() => onCancel(b.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <FiTrash2 size={13} /> Cancel
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTicket && (
        <div className="modal-backdrop" onClick={() => setSelectedTicket(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Ticket</p>
                <h3 style={{ margin: 0, fontSize: 22 }}>{selectedTicket.eventTitle}</h3>
              </div>
              <button className="modal-close" type="button" onClick={() => setSelectedTicket(null)}>
                <FiX size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div>
                <img src={getTicketQrSrc(selectedTicket)} alt="Ticket QR code" />
              </div>
              <div className="modal-ticket-info">
                <p style={{ color: 'var(--text-secondary)' }}>Scan this QR code at the event entrance using your phone.</p>
                <p><strong>Ticket Code</strong><br />{selectedTicket.ticketCode || `#${selectedTicket.id}`}</p>
                <p><strong>Event</strong><br />{selectedTicket.eventTitle}</p>
                <p><strong>Date</strong><br />{selectedTicket.eventDate} {selectedTicket.eventTime || ''}</p>
                <p><strong>Location</strong><br />{selectedTicket.eventLocation}</p>
                <p><strong>Tickets</strong><br />{selectedTicket.ticketCount}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => handleDownloadQr(selectedTicket)}>
                    <FiDownload size={14} /> Download QR
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => handleShareBooking(selectedTicket)}>
                    <FiShare2 size={14} /> Share Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
