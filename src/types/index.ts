export interface UserProfile {
  id: number;
  telegram_id: number;
  full_name: string;
  phone_number: string;
  national_id: string;
  sheba?: string;
  role: 'employer' | 'freelancer' | 'arbitrator' | 'admin';
  wallet_balance: number;
  escrow_locked_balance: number;
  kyc_level: 'bronze' | 'silver' | 'gold';
  kyc_status: 'pending' | 'verified' | 'rejected';
  referral_code: string;
  created_at: string;
}

export interface Contract {
  id: string;
  contract_id: string;
  title: string;
  amount: number;
  category: 'DEV' | 'DS' | 'CNT' | 'MKT' | 'GEN';
  deadline: number;
  description: string;
  free_edits: number;
  free_edits_left: number;
  commission_payer: 'freelancer' | 'employer' | 'split';
  creator_id: number;
  created_by: number;
  status: 'draft' | 'awaiting_payment' | 'active' | 'work_submitted' | 'completed' | 'in_dispute' | 'pending_party_b' | 'cancelled' | 'awaiting_receipt_approval';
  buyer_id: number;
  buyer_fullname: string;
  buyer_phone: string;
  buyer_national_id?: string;
  buyer_signed_at?: string;
  buyer_otp_verified?: boolean;
  seller_id: number;
  seller_fullname: string;
  seller_phone: string;
  seller_national_id?: string;
  seller_signed_at?: string;
  seller_otp_verified?: boolean;
  deliverables?: {
    notes: string;
    links: string[];
    submitted_at: string;
  };
  history: { event: string; timestamp: string; actor: string }[];
  created_at: string;
}

export interface WalletTransaction {
  id: string;
  user_id: number;
  type: 'deposit' | 'withdrawal' | 'escrow_lock' | 'escrow_release' | 'affiliate_reward' | 'withdraw';
  amount: number;
  title: string;
  status: 'pending' | 'completed' | 'failed';
  ref_id?: string;
  contract_id?: string;
  created_at: string;
}

export interface DisputeMessage {
  id: string;
  sender_id: number;
  sender_name: string;
  sender_role: 'buyer' | 'seller' | 'arbitrator';
  text: string;
  timestamp: string;
}

export interface DisputeCase {
  id: string;
  contract_id: string;
  contract_title: string;
  claimant_id: number;
  claimant_name: string;
  reason: string;
  description: string;
  evidence_files: string[];
  status: 'under_review' | 'resolved' | 'closed';
  messages: DisputeMessage[];
  ruling?: { comment: string };
  created_at: string;
}

export interface AffiliateStats {
  total_referrals: number;
  total_earned: number;
  referral_link: string;
  withdrawable_commission: number;
  total_invited: number;
  active_traders: number;
  total_commission_earned: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: 'status_change' | 'message' | 'system' | 'escrow' | 'arbitration';
  contractId?: string;
  timestamp: string;
  read: boolean;
}
