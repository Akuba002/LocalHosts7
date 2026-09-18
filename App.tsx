import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react-native';

type Color = keyof typeof colors;

const colors = {
  ink: '#242522',
  muted: '#777873',
  cream: '#F7F3ED',
  white: '#FFFFFF',
  coral: '#F07E68',
  lilac: '#D8D0FF',
  mint: '#D8EEDB',
  line: '#E5E0D8',
  pale: '#F1ECE5',
};

const menuItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Orders', icon: ClipboardList },
  { label: 'Products', icon: Package },
  { label: 'Customers', icon: Users },
  { label: 'Marketing', icon: BarChart3 },
];

const orders = [
  { id: '#MC-10482', customer: 'S. Ahmed', total: '£124.90', status: 'Ready', tone: 'mint' as Color },
  { id: '#MC-10481', customer: 'J. Walker', total: '£86.40', status: 'Packing', tone: 'lilac' as Color },
  { id: '#MC-10480', customer: 'A. Chen', total: '£219.00', status: 'Ready', tone: 'mint' as Color },
  { id: '#MC-10479', customer: 'M. Singh', total: '£54.80', status: 'Review', tone: 'coral' as Color },
];

const inventory = [
  { name: 'CloudSoft Baby Blanket', category: 'Nursery', sku: 'MC-8821', available: '8 left', status: 'Low stock', tone: 'coral' as Color },
  { name: 'Organic Cotton Sleepsuit', category: 'Clothing', sku: 'MC-7440', available: '12 left', status: 'Reorder', tone: 'lilac' as Color },
  { name: 'Mealtime Starter Set', category: 'Feeding', sku: 'MC-6182', available: '26 left', status: 'Healthy', tone: 'mint' as Color },
];

function Badge({ children, tone = 'white' }: { children: string; tone?: Color }) {
  return <View style={[styles.badge, { backgroundColor: colors[tone] }]}><Text style={styles.badgeText}>{children}</Text></View>;
}

function StatCard({ label, value, change, tone }: { label: string; value: string; change: string; tone: Color }) {
  return <View style={[styles.statCard, { backgroundColor: colors[tone] }]}><Text style={styles.eyebrow}>{label}</Text><Text style={styles.statValue}>{value}</Text><Badge>{change}</Badge></View>;
}

function SectionTitle({ title, action, onPress }: { title: string; action: string; onPress?: () => void }) {
  return <View style={styles.sectionTitleRow}><Text style={styles.sectionTitle}>{title}</Text><Pressable onPress={onPress} style={styles.inlineAction} accessibilityRole="button"><Text style={styles.actionText}>{action}</Text><ChevronRight size={15} color={colors.coral} /></Pressable></View>;
}

function TableHeader({ inventoryTable = false }: { inventoryTable?: boolean }) {
  return <View style={styles.tableRow}><Text style={[styles.tableHeader, styles.colPrimary]}>{inventoryTable ? 'PRODUCT' : 'ORDER'}</Text><Text style={[styles.tableHeader, styles.colSecondary]}>{inventoryTable ? 'CATEGORY' : 'CUSTOMER'}</Text><Text style={[styles.tableHeader, styles.colSecondary]}>{inventoryTable ? 'SKU' : 'TOTAL'}</Text><Text style={[styles.tableHeader, styles.colSecondary]}>{inventoryTable ? 'AVAILABLE' : 'STATUS'}</Text>{inventoryTable && <Text style={[styles.tableHeader, styles.colStatus]}>STATUS</Text>}</View>;
}

function Dashboard() {
  const { width } = useWindowDimensions();
  const [active, setActive] = useState('Overview');
  const [showAllOrders, setShowAllOrders] = useState(false);
  const isDesktop = width >= 900;

  return <SafeAreaView style={styles.safeArea}><View style={styles.appShell}>
    {isDesktop && <View style={styles.sidebar}><Text style={styles.wordmark}>mothercare</Text><View style={styles.navList}>{menuItems.map(({ label, icon: Icon }) => { const selected = active === label; return <Pressable key={label} onPress={() => setActive(label)} style={[styles.navItem, selected && styles.navItemActive]} accessibilityRole="button"><Icon size={17} color={selected ? colors.ink : '#BFC0B8'} strokeWidth={selected ? 2.4 : 1.8} /><Text style={[styles.navLabel, selected && styles.navLabelActive]}>{label}</Text></Pressable>; })}</View><View style={styles.sidebarFooter}><Text style={styles.storeLabel}>STORE STATUS</Text><Text style={styles.storeValue}>Open · London</Text><Text style={styles.version}>v2.4.1</Text></View></View>}
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}><View style={styles.headerCopy}><Text style={styles.greeting}>Good morning, Amara</Text><Text style={styles.subtitle}>Here is what is happening in your store today.</Text></View><View style={styles.headerActions}><Pressable style={styles.dateButton} accessibilityRole="button"><Text style={styles.dateText}>15 Sep 2026</Text><ChevronDown size={15} color={colors.muted} /></Pressable><Pressable style={styles.addButton} accessibilityRole="button"><Plus size={17} color={colors.ink} /><Text style={styles.addButtonText}>Add product</Text></Pressable></View></View>
      {!isDesktop && <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mobileNav}><View style={styles.mobileNavInner}>{menuItems.map(({ label, icon: Icon }) => <Pressable key={label} onPress={() => setActive(label)} style={[styles.mobileNavItem, active === label && styles.mobileNavActive]}><Icon size={16} color={active === label ? colors.ink : colors.muted} /><Text style={[styles.mobileNavLabel, active === label && styles.mobileNavLabelActive]}>{label}</Text></Pressable>)}</View></ScrollView>}
      <View style={styles.statsGrid}><StatCard label="TODAY'S REVENUE" value="£8,492" change="+12.8% vs last week" tone="coral" /><StatCard label="ORDERS TO FULFIL" value="126" change="18 need attention" tone="lilac" /><StatCard label="LOW STOCK ITEMS" value="24" change="6 newly flagged" tone="mint" /><StatCard label="CONVERSION RATE" value="4.8%" change="+0.6% this week" tone="white" /></View>
      <View style={styles.mainGrid}><View style={styles.card}><SectionTitle title="Recent orders" action="View all" onPress={() => setShowAllOrders(!showAllOrders)} /><TableHeader />{(showAllOrders ? [...orders, ...orders] : orders).map((order, index) => <View style={styles.tableRow} key={`${order.id}-${index}`}><Text style={[styles.cellText, styles.colPrimary, styles.strong]}>{order.id}</Text><Text style={[styles.cellText, styles.colSecondary]}>{order.customer}</Text><Text style={[styles.cellText, styles.colSecondary]}>{order.total}</Text><View style={[styles.colSecondary, styles.statusCell]}><Badge tone={order.tone}>{order.status}</Badge></View></View>)}</View><View style={styles.pulseCard}><View><Text style={styles.pulseTitle}>Store pulse</Text><Text style={styles.pulseSubtitle}>Live performance</Text></View><View><Text style={styles.pulseValue}>£12.4k</Text><Text style={styles.pulseSubtitle}>projected this week</Text></View><View style={styles.chart}>{[40, 56, 45, 68, 62, 78, 92].map((height, index) => <View key={index} style={[styles.chartBar, { height }]} />)}</View><Text style={styles.pulseNote}>Sales are up 18% from last Tuesday.</Text></View></View>
      <View style={styles.card}><SectionTitle title="Inventory watchlist" action="Manage inventory" /><TableHeader inventoryTable />{inventory.map((item) => <View style={styles.tableRow} key={item.sku}><Text style={[styles.cellText, styles.colPrimary, styles.strong]}>{item.name}</Text><Text style={[styles.cellText, styles.colSecondary]}>{item.category}</Text><Text style={[styles.cellText, styles.colSecondary]}>{item.sku}</Text><Text style={[styles.cellText, styles.colSecondary]}>{item.available}</Text><View style={[styles.colStatus, styles.statusCell]}><Badge tone={item.tone}>{item.status}</Badge></View></View>)}</View>
      <View style={styles.footerHint}><Search size={15} color={colors.muted} /><Text style={styles.footerHintText}>Use search to find products, customers, or orders</Text><CircleHelp size={15} color={colors.muted} /></View>
    </ScrollView>
  </View></SafeAreaView>;
}

export default function App() { return <Dashboard />; }

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.cream }, appShell: { flex: 1, flexDirection: 'row' }, sidebar: { width: 220, backgroundColor: colors.ink, padding: 24, justifyContent: 'space-between' }, wordmark: { color: colors.white, fontSize: 22, fontWeight: '800', letterSpacing: -0.5 }, navList: { flex: 1, paddingTop: 42, gap: 8 }, navItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11, paddingHorizontal: 12, borderRadius: 10 }, navItemActive: { backgroundColor: colors.coral }, navLabel: { color: '#BFC0B8', fontSize: 13, fontWeight: '600' }, navLabelActive: { color: colors.ink }, sidebarFooter: { gap: 7 }, storeLabel: { color: '#A9AAA3', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 }, storeValue: { color: colors.white, fontSize: 13, fontWeight: '700' }, version: { color: '#A9AAA3', fontSize: 11 },
  content: { padding: 32, gap: 22, maxWidth: 1320, width: '100%', alignSelf: 'center' }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20 }, headerCopy: { flex: 1, gap: 5 }, greeting: { color: colors.ink, fontSize: 26, fontWeight: '800', letterSpacing: -0.5 }, subtitle: { color: colors.muted, fontSize: 13 }, headerActions: { flexDirection: 'row', gap: 10, alignItems: 'center' }, dateButton: { minHeight: 42, flexDirection: 'row', gap: 8, alignItems: 'center', paddingHorizontal: 13, borderRadius: 11, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.white }, dateText: { color: colors.muted, fontSize: 12, fontWeight: '600' }, addButton: { minHeight: 42, flexDirection: 'row', gap: 7, alignItems: 'center', paddingHorizontal: 14, borderRadius: 11, backgroundColor: colors.coral }, addButtonText: { color: colors.ink, fontSize: 12, fontWeight: '800' }, mobileNav: { marginHorizontal: -8 }, mobileNavInner: { flexDirection: 'row', gap: 8, paddingHorizontal: 8 }, mobileNavItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 9, backgroundColor: colors.white }, mobileNavActive: { backgroundColor: colors.coral }, mobileNavLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' }, mobileNavLabelActive: { color: colors.ink },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14 }, statCard: { flex: 1, minWidth: 200, minHeight: 145, padding: 20, borderRadius: 16, justifyContent: 'space-between', gap: 12 }, eyebrow: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 0.7 }, statValue: { color: colors.ink, fontSize: 28, fontWeight: '800', letterSpacing: -0.7 }, badge: { alignSelf: 'flex-start', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }, badgeText: { color: colors.ink, fontSize: 10, fontWeight: '800' }, mainGrid: { flexDirection: 'row', gap: 18, alignItems: 'stretch' }, card: { flex: 1, backgroundColor: colors.white, borderRadius: 16, padding: 20, gap: 14, minWidth: 0 }, pulseCard: { width: 270, backgroundColor: colors.ink, borderRadius: 16, padding: 20, justifyContent: 'space-between', gap: 18 }, sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }, sectionTitle: { color: colors.ink, fontSize: 17, fontWeight: '800', letterSpacing: -0.2 }, inlineAction: { flexDirection: 'row', alignItems: 'center', gap: 2 }, actionText: { color: colors.coral, fontSize: 12, fontWeight: '800' }, tableRow: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 42, borderBottomWidth: 1, borderBottomColor: colors.pale }, tableHeader: { color: colors.muted, fontSize: 9, fontWeight: '800', letterSpacing: 0.6 }, cellText: { color: colors.muted, fontSize: 12 }, strong: { color: colors.ink, fontWeight: '700' }, colPrimary: { flex: 1.5, minWidth: 90 }, colSecondary: { flex: 1, minWidth: 58 }, colStatus: { flex: 1, minWidth: 65 }, statusCell: { alignItems: 'flex-start' }, pulseTitle: { color: colors.white, fontSize: 17, fontWeight: '800' }, pulseSubtitle: { color: '#BDBDB4', fontSize: 12 }, pulseValue: { color: colors.coral, fontSize: 30, fontWeight: '800', letterSpacing: -0.7 }, chart: { height: 95, flexDirection: 'row', alignItems: 'flex-end', gap: 7 }, chartBar: { width: 15, backgroundColor: colors.coral, borderRadius: 4 }, pulseNote: { color: colors.white, fontSize: 12, fontWeight: '700' }, footerHint: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 2 }, footerHintText: { color: colors.muted, fontSize: 11 },
});