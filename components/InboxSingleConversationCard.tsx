import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { inboxStyles } from '../styles/inbox';
import { ConversationInboxInfo } from '../types/conversations';

type Props = {
  conversation: ConversationInboxInfo;
};

function InboxSingleConversationCard({ conversation }: Props) {
  return (
    <Link href={`/inbox/${conversation.id}`} css={inboxStyles.link}>
      <div css={inboxStyles.conversationsBox}>
        <div css={inboxStyles.conversationsBoxInner}>
          <input type="checkbox" />
          <div css={inboxStyles.conversationsBoxAvatar}>
            <CldImage
              src={conversation.imgPath.slice(50)}
              width={50}
              height={50}
              alt="avatar"
            />
          </div>
          <p>{conversation.username}</p>
        </div>
        <div>
          <p>
            Subject: <strong>{conversation.bookTitle}</strong>
          </p>
        </div>
        <div>
          <p>{conversation.createdAt as string}</p>
        </div>
      </div>
    </Link>
  );
}

export default InboxSingleConversationCard;
