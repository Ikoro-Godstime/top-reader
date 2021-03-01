import {
  Typography,
  Container,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  CardMedia,
  Button,
} from '@material-ui/core'

import Moment from 'react-moment'

import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 140,
  },
}))

export default function Home({ data: { articles } }) {
  const classes = useStyle()

  return (
    <>
      <header>
        <Container>
          <Typography
            variant="h1"
            align="center"
            style={{
              fontWeight: 'bold',
              fontSize: '1.6rem',
              marginTop: '1.4rem',
              textTransform: 'uppercase',
            }}
          >
            Top Readers{' '}
          </Typography>
        </Container>
      </header>
      <main style={{ marginTop: '1.5rem' }}>
        <Container>
          <Grid container spacing={4} alignItems="center" justify="center">
            {articles &&
              articles.map((article, index) => (
                <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                  <Card className={classes.root} raised={true}>
                    <CardMedia
                      image={article.urlToImage}
                      className={classes.media}
                      component="img"
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom align="left">
                        <Moment fromNow>{article.publishedAt}</Moment>
                      </Typography>
                      <Typography variant="body2" gutterBottom component="p">
                        {article.description}
                      </Typography>
                    </CardContent>
                    <CardActionArea style={{ paddingLeft: '0.5rem' }}>
                      <Button variant="text" color="primary" href={article.url}>
                        View More
                      </Button>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export async function getStaticProps() {
  // fetch the news from the news API
  const res = await fetch(
    `http://newsapi.org/v2/top-headlines?country=ng&apiKey=3b684679c5394b4ba667ce2730790313`,
  )

  const data = await res.json()

  return {
    props: { data },
  }
}
