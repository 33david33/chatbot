import React from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { lngFileConfig } from '../../config';
import { useChatbotReducer } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  cardRoot: {
    // maxWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

// content totally random!

const Content = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(lngFileConfig.CONTENT);
  const { openChat } = useChatbotReducer();
  return (
    <Paper className={`${classes.root}`}>
      <Typography variant="h3">{t('header')}</Typography>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text1')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text2')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>{' '}
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text1')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text2')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>{' '}
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text1')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text2')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>{' '}
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text1')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={6} item>
          <Card className={classes.cardRoot}>
            <CardContent>
              <Typography variant="body1" paragraph>
                {t('text2')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={openChat}>
        {t('openChat')}
      </Button>
    </Paper>
  );
};
export default Content;
