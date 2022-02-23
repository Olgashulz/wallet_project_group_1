import s from './TransactionMobileItem.module.css';

export default function TransactionMobileItem({ data }) {
  // const splitedDate = data.date.split('.');
  // const cuted = splitedDate[2].substr(-2);
  // const formatedDate = splitedDate[0] + '.' + splitedDate[1] + '.' + cuted;
  return (
    <ul
      className={s.transactionDetailsMobile}
      style={{
        borderLeft: data.type ? '5px solid #24CCA7' : '5px solid #FF6596',
      }}
    >
      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Date</p>
        <p className={s.transactionDetailsRowValueMobile}>{data.date}</p>
      </li>

      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Type</p>
        <p className={s.transactionDetailsRowValueMobile}>
          {data.type ? '+' : '-'}
        </p>
      </li>

      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Category</p>
        <p className={s.transactionDetailsRowValueMobile}>{data.category}</p>
      </li>
      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Comment</p>
        <p className={s.transactionDetailsRowValueMobile}>{data.comment}</p>
      </li>
      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Amount</p>
        <p className={s.transactionDetailsRowValueMobile}>{data.sum / 100}</p>
      </li>
      <li className={s.transactionDetailsRowMobile}>
        <p className={s.transactionDetailsRowLabelMobile}>Balance</p>
        <p className={s.transactionDetailsRowValueMobile}>
          {data.balance / 100}
        </p>
      </li>
    </ul>
  );
}
