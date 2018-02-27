import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { getError } from 'modules/transfer/selectors'
import { getParams } from 'modules/location/selectors'
import { transferParcelRequest, cleanTransfer } from 'modules/transfer/actions'
import { locations } from 'locations'

import TransferParcelPage from './TransferParcelPage'

const mapState = (state, ownProps) => {
  const params = getParams(ownProps)
  const x = parseInt(params.x, 10)
  const y = parseInt(params.y, 10)
  return {
    x,
    y,
    error: getError(state) // TODO: getErrors(txHash). transferError
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const params = getParams(ownProps)
  const x = parseInt(params.x, 10)
  const y = parseInt(params.y, 10)
  return {
    onSubmit: (parcel, address) =>
      dispatch(transferParcelRequest(parcel, address)),
    onCancel: () => dispatch(push(locations.parcelDetail(x, y))),
    onCleanTransfer: () => dispatch(cleanTransfer()) // TODO: by id
  }
}

export default withRouter(connect(mapState, mapDispatch)(TransferParcelPage))
