import { useParams } from 'react-router';
import { ResourcePage } from '../ResourcePage';
import { getResourceUrl } from '../util/resource';

/**
 * Page for displaying a PDF
 */
export const PdfPage = (): JSX.Element => {
  const { sectionId } = useParams();
  const pdfUrl = getResourceUrl(`resources/pdf/${sectionId}.pdf`);
  return (
    <ResourcePage>
      <div>
        <iframe title={sectionId} src={pdfUrl} width="100%" height="1000px" />
      </div>
    </ResourcePage>
  );
};
