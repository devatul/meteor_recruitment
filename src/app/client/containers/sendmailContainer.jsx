import React from 'react';
import { connect } from 'react-redux'
import { Router, browserHistory, Link, withRouter } from 'react-router'
import * as _ from 'lodash'

import {saveTemplate, fetchTemplate, deleteTemplate} from '../actions/emailTemplates'
import Header from './../components/generic/Header'
import SendEmail from './../components/sendmail'



class SendMails extends React.Component {
    constructor( props ){
        super( props )
    }
    componentWillMount(){
        if (!Meteor.userId()) {
        this.props.router.push('/login');
        }
    }

    render(){
        return(
        	<div>
                <Header {...this.props} position={0} altr={"Email Templates"}/>
                <SendEmail {...this.props} />
        	</div>
        )
    }
}
function mapStateToProps( state ){
    state = state.toJS()
    return {
        emailTemplates : state.entities.emailTemplates,
        inbox : state.entities.inbox,
        emailSetting : state.entities.emailSetting,
        tags : state.entities.inboxTag.sort(function(a, b){let x=a.name.localeCompare(b.name); if(x==1)return(1);if(x==-1)return(-1);return 0;}),
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSaveTemplate:(id, template)=>{
            return dispatch(saveTemplate(id,template))
        },
        onfetchTemplate:()=>{
            return dispatch(fetchTemplate())
        },
        onDeleteTemplate:(id)=>{
            return dispatch(deleteTemplate(id))
        }
    }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)( SendMails ))
