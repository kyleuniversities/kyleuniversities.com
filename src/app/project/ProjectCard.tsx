import { Card, Container, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ReactMarkdown from 'react-markdown';
import { fetchJson, fetchText } from '../util/fetch';
import { MultiLineBreak } from '../../common/util/js/line';
import './index.css';
import { getResourceUrl } from '../util/resource';
import { MarkdownHelper } from '../helper/MarkdownHelper';
import { ifThen } from '../../common/util/conditional';
import {
  BIG_SCREEN_QUERY,
  MEDIUM_SCREEN_QUERY,
} from '../../common/util/mobile';

/**
 * Constant for the loading card
 */
const LOADING_CARD = { title: 'Loading...', description: 'Loading...' };

/**
 * Card for displaying introductory information about a project
 */
export const ProjectCard = (props: { name: string }): JSX.Element => {
  const [data, setData] = useState(LOADING_CARD);
  const [introText, setIntroText] = useState('');
  const resourcePreText = getResourceUrl(`resources/project/${props.name}`);
  const dataUrl = `${resourcePreText}/data.json`;
  const image = `${resourcePreText}/image.png`;
  const introUrl = `${resourcePreText}/intro.md`;
  const isBigScreen = useMediaQuery(BIG_SCREEN_QUERY);
  const isMediumScreen = useMediaQuery(MEDIUM_SCREEN_QUERY);
  const isSmallScreen = !isBigScreen && !isMediumScreen;
  useEffect(() => {
    loadProjectCard({
      dataUrl,
      introUrl,
      setData,
      setIntroText,
      isBigScreen,
      isMediumScreen,
      isSmallScreen,
    });
  }, [dataUrl, introUrl, isBigScreen, isMediumScreen, isSmallScreen]);
  return (
    <Card fluid>
      <ProjectCardContainer
        dataToken={props.name}
        title={data.title}
        image={image}
        introText={introText}
      />
    </Card>
  );
};

/**
 * Container for displaying project card data
 */
const ProjectCardContainer = (props: {
  dataToken: string;
  title: string;
  image: string;
  introText: string;
}): JSX.Element => {
  return (
    <Container fluid className="projectCardContainer">
      <Link to={`/projects/${props.dataToken}`}>
        <ProjectCardTitle title={props.title} />
        <MultiLineBreak lines={2} />
        <ProjectCardImageContainer image={props.image} />
      </Link>
      <MultiLineBreak lines={2} />
      <ProjectCardMarkdown introText={props.introText} />
    </Container>
  );
};

/**
 * Span for project card markdown
 */
const ProjectCardMarkdown = (props: { introText: string }): JSX.Element => {
  return (
    <span className="projectCardMarkdown">
      <ReactMarkdown children={props.introText} />
    </span>
  );
};

/**
 * Span for project card title
 */
const ProjectCardTitle = (props: { title: string }): JSX.Element => {
  return <span className="projectCardTitle">{props.title}</span>;
};

/**
 * Container for displaying project card image
 */
const ProjectCardImageContainer = (props: { image: string }): JSX.Element => {
  return (
    <Container>
      <Image centered src={props.image} />
    </Container>
  );
};

/**
 * Type for Project Card Loading function properties
 */
type LoadProjectCardProps = {
  dataUrl: string;
  introUrl: string;
  setData: (res: any) => void;
  setIntroText: (res: string) => void;
  isBigScreen: boolean;
  isMediumScreen: boolean;
  isSmallScreen: boolean;
};

/**
 * Loads the project card data
 */
const loadProjectCard = (props: LoadProjectCardProps) => {
  fetchJson(props.dataUrl, props.setData);
  fetchText(props.introUrl, (text) => {
    ifThen(props.isBigScreen, () => props.setIntroText(text));
    ifThen(props.isMediumScreen, () =>
      props.setIntroText(MarkdownHelper.reformat(text, 50))
    );
    ifThen(props.isSmallScreen, () =>
      props.setIntroText(MarkdownHelper.reformat(text, 26))
    );
  });
};
