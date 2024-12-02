import React, { memo, useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import image from '../../assets/images/modals/world.svg';
import IconModal from '../IconModal';

import FetchApi from '../../core/fetch/FetchApi';
import { HttpMethods } from '../../core/fetch/HttpMethod';
import Config from '../../config';
import formatRequestBody from '../../temp/formatRequestBody';
import generateValidUrl from '../../core/fetch/generateValidUrl';
import useTranslation from '../../services/i18n/core/useTranslation';
import { getUser } from '../../selectors/AuthenticationSelectors';
import { IState } from '../../models/state';
import NotificationActionCreator from '../../services/Notifications/actions/NotificationActionCreator';
import ResourceService from '../../services/i18n/ResourcesService';

export interface IChangeLocationDialogProps {
  isOpen: boolean;
  onClose(): void;
}

export const ContactForm = memo((props: IChangeLocationDialogProps) => {

    const {
        CONTACT_NICKNAME,
        SETTINGS_CONTACT_FORM,
        CONTACT_EMAIL,
        CONTACT_SUBJECT,
        CONTACT_MESSAGE,
        CONTACT_SUBMIT,

    } = useTranslation();
  const { isOpen, onClose } = props;
  const { user } = useSelector((state: IState) => ({ user: getUser(state) }));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataArray = { ...formData };
    const href = generateValidUrl(Config.LOGIN_USER_URL);
    FetchApi.fetch(href, formatRequestBody('contact_support', user?.Userid, { data: dataArray }), HttpMethods.POST);
    setFormData({
      nickname: '',
      email: '',
      subject: '',
      message: '',
    });
    const { ALERT_SUPPORT_MESSAGE } = ResourceService.getCurrentResources('ALERT_SUPPORT_MESSAGE');
    dispatch(
      NotificationActionCreator.enqueueSnackbar({
          key: String(new Date().getTime() + Math.random()),
          message: ALERT_SUPPORT_MESSAGE,
          options: { variant: 'success' },
      })
    );
  };

  return (
    <IconModal open={isOpen} onClose={onClose} icon={image} title={SETTINGS_CONTACT_FORM}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={CONTACT_NICKNAME}
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={CONTACT_EMAIL}
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={CONTACT_SUBJECT}
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={CONTACT_MESSAGE}
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              {CONTACT_SUBMIT}
            </Button>
          </Grid>
        </Grid>
      </form>
    </IconModal>
  );
});

export default ContactForm;