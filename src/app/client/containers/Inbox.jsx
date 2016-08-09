import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import * as actions_inbox from './../actions/inbox'

import Header from './../components/generic/Header'
import EmailsList from './../components/inbox/EmailsList'

class Inbox extends React.Component {
    constructor( props ){
        super( props )
        this.state = {
            emails_per_page : 20,
            page_num : 1
        }
        this.doPageChange = this.doPageChange.bind(this)
    }
    componentWillMount(){
        this.props.onInboxData( this.state.emails_per_page, this.state.page_num )
    }
    componentWillReceiveProps( props ){
    }
    doPageChange( page_num ){
        if( page_num != '' ){
            this.props.onInboxData( this.state.emails_per_page, page_num )
        }
    }
    render(){
        return(
        	<div>
                <Header title="Inbox"/>
                <EmailsList inbox={this.props.inbox} doPageChange={this.doPageChange} />
        	</div>
        )
    }
}
function mapStateToProps( state ){
    state = state.toJS()
    return {
        inbox : state.entities.inbox
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
     	onInboxData : ( emails_per_page, page_num ) => {
            return dispatch( actions_inbox.getInboxData( emails_per_page, page_num ) )
        }
    }
}

const VisibleInbox = connect(
  mapStateToProps,
  mapDispatchToProps
)( Inbox )

const RouterVisibleInbox = withRouter( VisibleInbox )

export default RouterVisibleInbox