import {NavLink} from "react-router-dom";
import CopyButton from "../CopyButton";
import React from "react";
import BigNumber from "bignumber.js";

import './MessageBox.scss'

const MessageBoxDesktop = (msgs, linkList, copyList, lang, key) => (
    <div className="message" key={key}>
        {
            msgs.map((msg, i) => (
                <div className="card" key={i}>
                    <div className="type">
                        {msg.type.split('/')[1]}
                    </div>
                    <div className="table">
                        <div className="keys">
                            {Object.keys(msg.value).map((key, i) => (
                                <div key={i}>{key}</div>
                            ))}
                        </div>
                        <div className="values">
                            {
                                Object.entries(msg.value).map(([key, value], i) => {
                                    for (let i = 0; i < linkList.length; i += 1) {
                                        if (linkList[i].indexOf(key) !== -1) {
                                            const linkTo = `/${lang}/${linkList[i].split('/')[0]}/${msg.value[key]}`;
                                            return (<div key={key}>
                                                {
                                                    key === 'url'
                                                        ? (<a href={msg.value[key]}>{msg.value[key]}</a>)
                                                        : (<NavLink to={linkTo}>{msg.value[key]}</NavLink>)
                                                }
                                                {
                                                    (copyList.indexOf(key) !== -1 && msg.value[key]) &&
                                                    <CopyButton value={msg.value[key]}/>
                                                }
                                            </div>);
                                        }
                                    }

                                    return (
                                        <div key={i}>
                                            {ValueConverter(key, value)}
                                            {
                                                (copyList.indexOf(key) !== -1 && msg.value[key]) &&
                                                <CopyButton value={msg.value[key]}/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
)

const MessageBoxMobile = (msgs, linkList, copyList, lang, key) => (
    <div className="message mobile" key={key}>
        {
            msgs.map((msg, i) => (
                <div className="card" key={i}>
                    <div className="type">
                        {msg.type.split('/')[1]}
                    </div>
                    <div className="table">
                        {
                            Object.keys(msg.value).map((key) => {
                                const value = msg.value[key];
                                return (
                                    <div className="messageRow" key={key}>
                                        <div className="key">
                                            {key}
                                        </div>
                                        <div className="value">
                                            {
                                                (() => {
                                                    for (let i = 0; i < linkList.length; i += 1) {
                                                        if (linkList[i].indexOf(key) !== -1) {
                                                            const linkTo = `/${lang}/${linkList[i].split('/')[0]}/${msg.value[key]}`;
                                                            return (<React.Fragment>
                                                                {
                                                                    key === 'url'
                                                                        ? (
                                                                            <a href={msg.value[key]}>{msg.value[key]}</a>)
                                                                        : (
                                                                            <NavLink to={linkTo}>{msg.value[key]}</NavLink>)
                                                                }
                                                                {
                                                                    (copyList.indexOf(key) !== -1 && msg.value[key]) &&
                                                                    <CopyButton value={msg.value[key]}/>
                                                                }
                                                            </React.Fragment>);
                                                        }
                                                    }

                                                    return (
                                                        <div key={i}>
                                                            {ValueConverter(key, value)}
                                                            {
                                                                (copyList.indexOf(key) !== -1 && msg.value[key]) &&
                                                                <CopyButton value={msg.value[key]}/>
                                                            }
                                                        </div>
                                                    )
                                                })()
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            ))
        }
    </div>
);

const ValueConverter = (key, value) => {
    switch (key) {
        case 'amount':
            if (Array.isArray(value) && value.length > 0)
                return `${new BigNumber(value[0].amount).shiftedBy(-6).toString().comma()} ${value[0].denom.substr(1).toUpperCase()}`

            return '-';
        default:
            return <div>{typeof value === 'object' ? JSON.stringify(value) : value}</div>;
    }
}

const MessageBox = ({msgs, linkList, copyList, lang, key, isMobile}) => {
    if (!msgs)
        return;

    if (isMobile)
        return MessageBoxMobile(msgs, linkList, copyList, lang, key);
    else
        return MessageBoxDesktop(msgs, linkList, copyList, lang, key);
}

export default MessageBox;
