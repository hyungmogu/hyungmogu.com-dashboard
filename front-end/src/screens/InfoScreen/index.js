import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Form from '../../components/Form'
import styled from 'styled-components';
import constants from '../../constants';
import Button from '../../components/Button';


const InfoScreenStyle = {
    Section: styled.section`
        border: 1px solid ${constants.colorGrey};
        border-radius: ${constants.borderRadius};
        padding: ${constants.sectionPadding};
    `,
    H2: styled.h2`
        color: ${constants.colorNavyBlue};
    `,
    ButtonSection: styled.section`
        display: flex;
        justify-content: flex-end;

        &:not(:last-child){
            margin: 0 0 1.41rem 0;
        }
    `
};

function InfoScreen() {
    const location = useLocation();
    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [nickName, setNickName] = useState("");
    const [website, setWebsite] = useState("");
    const [socials, _setSocials] = useState([]);
    const [contacts, _setContacts] = useState([]);

    const setSocial = (eKey, eVal, index, list) => {
        list[index].name = eKey && eKey.target && eKey.target.value ? eKey.target.value : list[index].name;
        list[index].value = eVal && eVal.target && eVal.target.value ? eVal.target.value : list[index].value;
        _setSocials(list);
    }

    const addSocial = (list) => {
        if (!Array.isArray(list) || list.length === 0) {
            _setSocials([{"name": "", "value": ""}]);
            return;
        }
        _setSocials([...list, {"name": "", "value": ""}]);
    }

    const deleteSocial = (index, list) => {
        if (!list[index].id) {
            list.splice(index, 1);
            _setContacts([...list]);
            return;
        }

        const id = list[index].id;
        fetch(`${constants.serverURL}/admin/info/socials/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setSocials([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const setContact = (eKey, eVal, index, list) => {
        list[index].name = eKey && eKey.target && eKey.target.value ? eKey.target.value : list[index].name;
        list[index].value = eVal && eVal.target && eVal.target.value ? eVal.target.value : list[index].value;
        _setContacts(list);
    }

    const addContact = (list) => {
        if (!Array.isArray(list) || list.length === 0) {
            _setContacts([{"name": "", "value": ""}]);
            return;
        }
        _setContacts([...list, {"name": "", "value": ""}]);
    }

    const deleteContact = (index, list) => {
        if (!list[index].id) {
            list.splice(index, 1);
            _setContacts([...list]);
            return;
        }

        const id = list[index].id;
        fetch(`${constants.serverURL}/admin/info/contacts/${id}`, {
            method: "DELETE"
        }).then(_ => {
            list.splice(index, 1);
            _setContacts([...list]);
        }).catch(error => {
            console.error(error);
        });
    }

    const editInfo = (e, history) => {
        const info = {
            first_name: firstName,
            last_name: lastName,
            nick_name: nickName,
            website: website,
            contacts: contacts,
            socials: socials
        };

        fetch(`${constants.serverURL}/admin/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => {
            history.push(`/admin/info`);
        }).catch(error => {
            console.error(error);
        });
    }

    const getInfo = () => {
        fetch(`${constants.serverURL}/admin/info`)
        .then(response => response.json())
        .then(data => {
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setNickName(data.nick_name);
            setWebsite(data.website);
            if (data.contacts.length === 0) {
                addContact(contacts);
            } else {
                _setContacts(data.contacts);
            }
            if (data.socials.length === 0) {
                addSocial(socials);
            } else {
                _setSocials(data.socials);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <InfoScreenStyle.Section>
            <InfoScreenStyle.H2>Personal Information</InfoScreenStyle.H2>
            <InfoScreenStyle.ButtonSection>
                <Button primary onClick={e => editInfo(e, history)}>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
            <form>
                <Form.FormGroup>
                    <label>First Name</label>
                    <Form.Input
                        defaultValue={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Last Name</label>
                    <Form.Input
                        defaultValue={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Nick Name</label>
                    <Form.Input
                        defaultValue={nickName}
                        onChange={e => setNickName(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Website</label>
                    <Form.Input
                        defaultValue={website}
                        onChange={e => setWebsite(e.target.value)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Contact</label>
                    <Form.KeyValueInputList
                        list={contacts}
                        onChange={(eKey, eVal, index) => setContact(eKey, eVal, index, contacts)}
                        onAdd={_ => addContact(contacts)}
                        onDelete={(e, index) => deleteContact(index, contacts)}
                    />
                </Form.FormGroup>
                <Form.FormGroup>
                    <label>Socials</label>
                    <Form.KeyValueInputList
                        list={socials}
                        onChange={(eKey, eVal, index) => setSocial(eKey, eVal, index, socials)}
                        onAdd={_ => addSocial(socials)}
                        onDelete={(e, index) => deleteSocial(index, socials)}
                    />
                </Form.FormGroup>
            </form>
            <InfoScreenStyle.ButtonSection>
                <Button primary onClick={e => editInfo(e, history)}>
                    Save
                </Button>
            </InfoScreenStyle.ButtonSection>
        </InfoScreenStyle.Section>
    );
}

export default InfoScreen;

