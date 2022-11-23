import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { inboxStyles } from '../styles/inbox';
import { ConversationInboxInfo } from '../types/conversations';

type Props = {
  conversation: ConversationInboxInfo;
  setDeleteConversationId: (prev: any) => (string | number)[];
};

function InboxSingleConversationCard({
  conversation,
  setDeleteConversationId,
}: Props) {
  /**
   * If the checkbox is checked, add the conversation id to the array of ids to delete. If the checkbox
   * is unchecked, remove the conversation id from the array of ids to delete.
   * @param e - React.ChangeEvent<HTMLInputElement>
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setDeleteConversationId((prev: string[]) => [...prev, conversation.id]);
    } else {
      setDeleteConversationId((prev: string[]) =>
        prev.filter((id: any) => id !== conversation.id),
      );
    }
  }

  return (
    <div css={inboxStyles.conversationsBox}>
      <div css={inboxStyles.conversationsBoxInner}>
        <input type="checkbox" onChange={handleChange} />
        <Link href={`/inbox/${conversation.id}`} css={inboxStyles.link}>
          <div css={inboxStyles.conversationsBoxAvatar}>
            <CldImage
              src={conversation.imgPath.slice(50)}
              width={50}
              height={50}
              alt="avatar"
            />
          </div>
        </Link>
        <p>{conversation.username}</p>
      </div>
      <Link href={`/inbox/${conversation.id}`} css={inboxStyles.link}>
        <div>
          <p>
            Subject: <strong>{conversation.bookTitle}</strong>
          </p>
        </div>
      </Link>
      <div>
        <p>{conversation.createdAt as string}</p>
      </div>
    </div>
  );
}

export default InboxSingleConversationCard;
