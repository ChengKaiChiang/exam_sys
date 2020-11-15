-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 
-- 伺服器版本： 10.4.10-MariaDB
-- PHP 版本： 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `exam_system`
--

-- --------------------------------------------------------

--
-- 資料表結構 `1090617211748_111`
--

CREATE TABLE `1090617211748_111` (
  `question_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `1090617211748_111`
--

INSERT INTO `1090617211748_111` (`question_number`) VALUES
(24),
(25),
(26),
(1),
(2),
(3);

-- --------------------------------------------------------

--
-- 資料表結構 `1090618150945_admin304`
--

CREATE TABLE `1090618150945_admin304` (
  `question_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `1090618150945_admin304`
--

INSERT INTO `1090618150945_admin304` (`question_number`) VALUES
(2),
(3),
(5),
(6);

-- --------------------------------------------------------

--
-- 資料表結構 `exam_paper`
--

CREATE TABLE `exam_paper` (
  `id` varchar(128) NOT NULL COMMENT '考卷ID',
  `subject_id` int(11) NOT NULL COMMENT '科目ID',
  `school_year` int(11) NOT NULL COMMENT '學年度',
  `semester` int(11) NOT NULL COMMENT '學期',
  `exam_type` int(11) NOT NULL COMMENT '考試類型',
  `user_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `exam_paper`
--

INSERT INTO `exam_paper` (`id`, `subject_id`, `school_year`, `semester`, `exam_type`, `user_id`) VALUES
('1090617211748_111', 1, 108, 1, 1, '111'),
('1090618150945_admin304', 1, 108, 1, 1, 'admin304');

-- --------------------------------------------------------

--
-- 資料表結構 `exam_question`
--

CREATE TABLE `exam_question` (
  `question_number` int(11) NOT NULL COMMENT '題號',
  `subject_id` int(11) NOT NULL COMMENT '科目ID',
  `chapter` int(11) NOT NULL COMMENT '章節',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '內容',
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '答案',
  `type` int(11) NOT NULL COMMENT '題型',
  `grade` int(11) NOT NULL COMMENT '年級',
  `time` datetime NOT NULL COMMENT '建立時間',
  `user_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '建立者ID',
  `update_time` datetime DEFAULT NULL COMMENT '最後更改時間',
  `update_user` varchar(128) DEFAULT NULL COMMENT '最後更改使用者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `exam_question`
--

INSERT INTO `exam_question` (`question_number`, `subject_id`, `chapter`, `content`, `answer`, `type`, `grade`, `time`, `user_id`, `update_time`, `update_user`) VALUES
(1, 1, 1, '下列「」內字音前後相同的是：(A)「簪」纓世族／浸潤之「譖」(B)若「垤」若穴／藩籬「桎」梏(C)財匱力「絀」／正身「黜」惡(D)「檣」傾楫摧／稼「穡」之道', 'B', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(2, 1, 1, '下列文句，用字完全正確的是：(A) 慢不經心的求學態度，將連帶降低學習成效(B) 謾罵與善意批評本質有別，二者心態也不同(C) 他的建築設計作品響譽國際，堪稱當代巨擘(D) 伴隨一晌貪歡而來的，常是慘不忍堵的代價', 'A', 1, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(3, 1, 1, '閱讀下列新詩，最適合填入□內的詞依序是：甲、山稜劃開暗夜／□□洩漏下來（瓦歷斯‧諾幹〈拆信刀〉）乙、路在前面／伸著／長長的舌頭／把一雙雙的腳／□了進去（向明〈七孔新笛〉）丙、最後一隻高音階的LA／還來不及出現／夕陽以吸塵器的速度／將這一切□□乾淨（顏艾琳〈夕陽前發生的事〉）丁、我撐傘走過老樹下／已不見它那灰白蒼老的影子／年輕的翠綠承受細雨的彈珠／調皮的□□在傘上（陳秀喜〈復活〉）(A)誓言／舔／沖刷／丟擲(B)誓言／捲／吞沒／流洩(C)祕密／舔／吞沒／丟擲(D)祕密／捲／沖刷／流洩', 'C', 1, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(4, 1, 2, '閱讀下文，最適合填入□□□□內的語詞依序是：葉石林《避暑錄話》中多精語。其論人才曰：「唐自懿、僖以後，人才日削，至於五代，謂之□□□□可也。然吾觀浮屠中乃有雲門、臨濟、德山、趙州數十輩人，卓然超世，是可與扶持天下，配古名臣。然後知其散而橫潰者，又有在此者也」云云。此論天下人才有定量，不出於此則出於彼，學問亦然。元明二代，於學術蓋無可言，至於詩文，亦不能出唐宋範圍，然書畫大家□□□□。國朝則學盛而藝衰。物莫能兩大，亦自然之勢也。（王國維《東山雜記》）(A)空國無人／沒沒無聞 (B)空國無人／接武而起(C)人才輩出／沒沒無聞 (D)人才輩出／接武而起', 'A', 1, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(5, 1, 2, '下列「」內字音前後相同的是：(A)「簪」纓世族／浸潤之「譖」(B)若「垤」若穴／藩籬「桎」梏(C)財匱力「絀」／正身「黜」惡(D)「檣」傾楫摧／稼「穡」之道', 'B', 1, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(6, 1, 2, '下列文句，用字完全正確的是：(A) 慢不經心的求學態度，將連帶降低學習成效(B) 謾罵與善意批評本質有別，二者心態也不同(C) 他的建築設計作品響譽國際，堪稱當代巨擘(D) 伴隨一晌貪歡而來的，常是慘不忍堵的代價', 'A', 1, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(7, 1, 1, '閱讀下列新詩，最適合填入□內的詞依序是：甲、山稜劃開暗夜／□□洩漏下來（瓦歷斯‧諾幹〈拆信刀〉）乙、路在前面／伸著／長長的舌頭／把一雙雙的腳／□了進去（向明〈七孔新笛〉）丙、最後一隻高音階的LA／還來不及出現／夕陽以吸塵器的速度／將這一切□□乾淨（顏艾琳〈夕陽前發生的事〉）丁、我撐傘走過老樹下／已不見它那灰白蒼老的影子／年輕的翠綠承受細雨的彈珠／調皮的□□在傘上（陳秀喜〈復活〉）(A)誓言／舔／沖刷／丟擲(B)誓言／捲／吞沒／流洩(C)祕密／舔／吞沒／丟擲(D)祕密／捲／沖刷／流洩', 'C', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(8, 1, 1, '依據上文，下列闡釋正確的是：(A) 「人非生而知之者，孰能無惑」，謂人皆不免有惑，故須從師以解惑(B) 「吾師道也，夫庸知其年之先後生於吾」，謂無論少長均應學習師道(C) 「聖人無常師」，謂聖人的教育方法異於一般教師，因此能啟迪後進(D) 「郯子之徒，其賢不及孔子」，謂郯子等人的學生不如孔子弟子優秀', 'C', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(9, 1, 1, '依據上文，最符合韓愈對「學習」看法的是：(A) 只要有心一定能聞道，學習永遠不嫌遲(B) 智愚之別會影響學習，故聞道有先有後(C) 學無止境，自少至長都應該精進地學習(D) 尊重專業，擇師學習不需計較身分年齡', 'C', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(10, 1, 2, '下列文句，與「惑而不從師，其為惑也終不解矣」同樣強調運用資源以追求成長的是：(A) 君子生非異也，善假於物也(B) 梓匠輪輿，能與人規矩，不能使人巧(C) 君子博學而日參省乎己，則知明而行無過(D) 日知其所亡，月無忘其所能，可謂好學也已矣', 'D', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(11, 1, 2, '下列敘述，符合作者看法的是：(A) 黑天鵝事件向來離奇，人類的經驗難以理解(B) 留意細微徵兆，有助於防範黑天鵝事件發生(C) 投資致富的關鍵，便是懂得避開黑天鵝事件(D) 科學研究若出現黑天鵝事件，可能翻轉知識', 'D', 1, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(12, 1, 1, '「寧可讓學得快的人等，也不能讓不會的人繼續不會。」下列何者最符合這句話所強調的教育理念？(A)強化資優教育，培養菁英(B)提倡忍讓，加強品格教育(C)視學生資質，給予適當教導(D)無論良與莠，一個都不放棄', 'C,D', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(13, 1, 1, '「野生動物隨著環境會發展出新的生活方式。城市中的灰色松鼠比鄉下的較快對威脅產生反應，牠們不吱吱叫驅趕敵人，而是垂下尾巴來警示敵人。」根據這段文字，下列敘述何者最不恰當？(A)城市松鼠會因環境改變毛色(B)城市松鼠會以垂下尾巴示警(C)鄉下松鼠對威脅的反應較慢(D)鄉下松鼠以吱吱叫驅趕敵人 ', 'A,D', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(14, 1, 1, '下列文句，何者詞語使用最恰當？(A)酒後不開車，未免發生事故(B)見到故居破敗，不免有些傷感(C)他毫無商量餘地，避免不近人情(D)他決心改正遲到毛病，難免受處罰', 'A,C', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(15, 1, 2, '「朋友曾問過我一個問題□失去視力和失去聽力，害怕哪一項？我思考許久，最後坦承：什麼也不想失去。眼睛的世界那樣可喜，聽見的聲音卻更像一種心靈的共振□閉上眼睛也能讓情節自己呼應。我不能放棄兩者□也不願被兩者放棄。」這段文字空格處的標點符號，依序填入下列何者最恰當？(A)，。；(B)，；、(C)：，，(D)：。、', 'C,D', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(16, 1, 2, '閱讀下列新詩，最適合填入□內的詞依序是：甲、山稜劃開暗夜／□□洩漏下來（瓦歷斯‧諾幹〈拆信刀〉）乙、路在前面／伸著／長長的舌頭／把一雙雙的腳／□了進去（向明〈七孔新笛〉）丙、最後一隻高音階的LA／還來不及出現／夕陽以吸塵器的速度／將這一切□□乾淨（顏艾琳〈夕陽前發生的事〉）丁、我撐傘走過老樹下／已不見它那灰白蒼老的影子／年輕的翠綠承受細雨的彈珠／調皮的□□在傘上（陳秀喜〈復活〉）(A)誓言／舔／沖刷／丟擲(B)誓言／捲／吞沒／流洩(C)祕密／舔／吞沒／丟擲(D)祕密／捲／沖刷／流洩', 'C,D', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(17, 1, 2, '閱讀下文，最適合填入□□□□內的語詞依序是：葉石林《避暑錄話》中多精語。其論人才曰：「唐自懿、僖以後，人才日削，至於五代，謂之□□□□可也。然吾觀浮屠中乃有雲門、臨濟、德山、趙州數十輩人，卓然超世，是可與扶持天下，配古名臣。然後知其散而橫潰者，又有在此者也」云云。此論天下人才有定量，不出於此則出於彼，學問亦然。元明二代，於學術蓋無可言，至於詩文，亦不能出唐宋範圍，然書畫大家□□□□。國朝則學盛而藝衰。物莫能兩大，亦自然之勢也。（王國維《東山雜記》）(A)空國無人／沒沒無聞 (B)空國無人／接武而起(C)人才輩出／沒沒無聞 (D)人才輩出／接武而起', 'A,C', 2, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(18, 1, 1, '下列「」內字音前後相同的是：(A)「簪」纓世族／浸潤之「譖」(B)若「垤」若穴／藩籬「桎」梏(C)財匱力「絀」／正身「黜」惡(D)「檣」傾楫摧／稼「穡」之道', 'B,C', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(19, 1, 1, '下列文句，用字完全正確的是：(A) 慢不經心的求學態度，將連帶降低學習成效(B) 謾罵與善意批評本質有別，二者心態也不同(C) 他的建築設計作品響譽國際，堪稱當代巨擘(D) 伴隨一晌貪歡而來的，常是慘不忍堵的代價', 'A,B', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(20, 1, 1, '閱讀下列新詩，最適合填入□內的詞依序是：甲、山稜劃開暗夜／□□洩漏下來（瓦歷斯‧諾幹〈拆信刀〉）乙、路在前面／伸著／長長的舌頭／把一雙雙的腳／□了進去（向明〈七孔新笛〉）丙、最後一隻高音階的LA／還來不及出現／夕陽以吸塵器的速度／將這一切□□乾淨（顏艾琳〈夕陽前發生的事〉）丁、我撐傘走過老樹下／已不見它那灰白蒼老的影子／年輕的翠綠承受細雨的彈珠／調皮的□□在傘上（陳秀喜〈復活〉）(A)誓言／舔／沖刷／丟擲(B)誓言／捲／吞沒／流洩(C)祕密／舔／吞沒／丟擲(D)祕密／捲／沖刷／流洩', 'B,C', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(21, 1, 2, '依據上文，下列闡釋正確的是：(A) 「人非生而知之者，孰能無惑」，謂人皆不免有惑，故須從師以解惑(B) 「吾師道也，夫庸知其年之先後生於吾」，謂無論少長均應學習師道(C) 「聖人無常師」，謂聖人的教育方法異於一般教師，因此能啟迪後進(D) 「郯子之徒，其賢不及孔子」，謂郯子等人的學生不如孔子弟子優秀', 'C,D', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(22, 1, 2, '依據上文，最符合韓愈對「學習」看法的是：(A) 只要有心一定能聞道，學習永遠不嫌遲(B) 智愚之別會影響學習，故聞道有先有後(C) 學無止境，自少至長都應該精進地學習(D) 尊重專業，擇師學習不需計較身分年齡', 'A,D', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(23, 1, 2, '「此事關係重大，一定要在時限內完成，不得有誤。」句中「得」字的字義與下列何者相同？(A)「得」過且過(B)相「得」益彰(C)忘懷「得」失(D)洋洋自「得」', 'B,D', 2, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(24, 1, 1, '我有一之筆。上述有何錯字，該改為何字?', '隻', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(25, 1, 1, '遊子今', '吟', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(26, 1, 1, '臨行密密逢', '縫', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(27, 1, 2, '報得三春輝', '暉', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(28, 1, 2, '真實成現', '呈', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(29, 1, 2, '寄托希望', '託', 4, 1, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(30, 1, 1, '有敢而發', '感', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(31, 1, 1, '掙開眼睛', '睜', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(32, 1, 1, '汽水真好渴', '喝', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(33, 1, 2, '注意保媛', '暖', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(34, 1, 2, '朢子成龍', '望', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(35, 1, 2, '一柱擘天', '擎', 4, 2, '2020-06-17 20:58:24', 'admin304', '2020-06-18 15:08:33', 'admin304'),
(36, 2, 1, ' World Trade Organization rules required Taiwan to open its markets to price-competitive _____ including food items.(A) interchange(B) imports(C) income(D) intakes .', 'A', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(37, 2, 1, 'The International Olympic Committee announced there would be a team of _____ in Rio 2016, who escaped from their own country because of war.(A) explorers(B) gangsters(C) refugees(D) supervisors .', 'B', 1, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(38, 2, 1, 'Though we have discovered and named more than one million species, tens of millions of animals and plants have yet to be _____.(A) fetched(B) implied(C) neglected(D) identified .', 'A,C', 2, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(39, 2, 1, 'The candy can no longer be sold because it was found to contain artificial ingredients far beyond the_____ level.(A) abundant (B) immense (C) permissible (D) descriptive', 'B,D', 2, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(40, 2, 1, 'If you want to increase the credit card application approval rate, you need to be _____ because credit card issuers often set the credit limit according to your salary.', 'employed', 3, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(41, 2, 1, 'Louise has two _____ buyers for her paintings. She feels certain that one of them will purchase some of her works.', 'prospective', 3, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(42, 2, 1, '我有一支筆。', 'I have a pen.', 4, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(43, 2, 1, 'Why are you running?', '為什麼你要跑。', 4, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(44, 2, 2, 'The candy can no longer be sold because it was found to contain artificial ingredients far beyond the_____ level.(A) abundant (B) immense (C) permissible (D) descriptive', 'A', 1, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(45, 2, 2, 'It is bullying to _____ a foreign speaker’s accent. No one deserves to be laughed at for their pronunciation.(A) mock (B) sneak (C) prompt (D) glare', 'B', 1, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(46, 2, 2, 'The police officer showed us pictures of drunk driving accidents to highlight the importance of staying _____ on the road.(A) sober (B) majestic (C) vigorous (D) noticeable', 'B,C', 2, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(47, 2, 2, 'Though we have discovered and named more than one million species, tens of millions of animals and plants have yet to be _____.(A) fetched(B) implied(C) neglected(D) identified .', 'A,C', 2, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(48, 2, 2, 'If you want to increase the credit card application approval rate, you need to be _____ because credit card issuers often set the credit limit according to your salary.', 'employed', 3, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(49, 2, 2, 'Louise has two _____ buyers for her paintings. She feels certain that one of them will purchase some of her works.', 'prospective', 3, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(50, 2, 2, '我有一顆蘋果。', 'I have an apple.', 4, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(51, 2, 2, 'What\'s your name?', '你叫什麼名字?', 4, 1, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(52, 2, 1, ' World Trade Organization rules required Taiwan to open its markets to price-competitive _____ including food items.(A) interchange(B) imports(C) income(D) intakes .', 'A', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(53, 2, 1, 'One of the more frightening _____ of avalanches is that people can be covered by a deep layer of snow, unable to escape.(A) determinants(B) predecessors(C) benedictions(D) consequences .', 'C', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(54, 2, 1, 'The International Olympic Committee announced there would be a team of _____ in Rio 2016, who escaped from their own country because of war.(A) explorers(B) gangsters(C) refugees(D) supervisors .', 'A', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(55, 2, 1, 'The police officer showed us pictures of drunk driving accidents to highlight the importance of staying _____ on the road.(A) sober (B) majestic (C) vigorous (D) noticeable', 'B,C', 2, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(56, 2, 1, 'The candy can no longer be sold because it was found to contain artificial ingredients far beyond the_____ level.(A) abundant (B) immense (C) permissible (D) descriptive', 'undefined', 2, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(57, 2, 1, ' Mentors gain the satisfaction of helping students understand the unfamiliar and often _____ world they will face.', 'daunting', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(58, 2, 1, 'Louise has two _____ buyers for her paintings. She feels certain that one of them will purchase some of her works.', 'prospective', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(59, 2, 1, 'If you want to increase the credit card application approval rate, you need to be _____ because credit card issuers often set the credit limit according to your salary.', 'employed', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(60, 2, 1, '我有一支筆。', 'I have a pinapple.', 4, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(61, 2, 1, 'Why are you running?', '為什麼你要跑。', 4, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(62, 2, 2, 'It is bullying to _____ a foreign speaker’s accent. No one deserves to be laughed at for their pronunciation.(A) mock (B) sneak (C) prompt (D) glare', 'B', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(63, 2, 2, 'The townspeople built a _____ in memory of the brave teacher who sacrificed her life to save her students from a burning bus.(A) monument (B) refugee (C) souvenir (D) firecracker', 'D', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(64, 2, 2, 'Although Mr. Tang claims that the house belongs to him, he has not offered any proof of _____.(A) convention (B) relationship (C) insurance (D) ownership', 'D', 1, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(65, 2, 2, 'The police officer showed us pictures of drunk driving accidents to highlight the importance of staying _____ on the road.(A) sober (B) majestic (C) vigorous (D) noticeable', 'B,C', 2, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(66, 2, 2, 'The candy can no longer be sold because it was found to contain artificial ingredients far beyond the_____ level.(A) abundant (B) immense (C) permissible (D) descriptive', 'A,B', 2, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(67, 2, 2, 'Though we have discovered and named more than one million species, tens of millions of animals and plants have yet to be _____.(A) fetched(B) implied(C) neglected(D) identified .', 'A,C', 2, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(68, 2, 2, 'Louise has two _____ buyers for her paintings. She feels certain that one of them will purchase some of her works.', 'prospective', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(69, 2, 2, ' Mentors gain the satisfaction of helping students understand the unfamiliar and often _____ world they will face.', 'daunting', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(70, 2, 2, 'If you want to increase the credit card application approval rate, you need to be _____ because credit card issuers often set the credit limit according to your salary.', 'employed', 3, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(71, 2, 2, 'Teacher Lin is better.', '林老師比較好。', 4, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(72, 2, 2, 'We are family.', '我們是家人。', 4, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(73, 2, 2, '你跳，我就跳。', 'You jump,Ijump.', 4, 2, '2020-06-17 20:58:33', '111', '2020-06-17 21:13:23', 'admin304'),
(75, 5, 1, '假定有許多勞工團體對於《勞動基準法》的部分修正條文不滿，認為其損害勞工權益，進而發起公投要求廢除新修訂的相關條文；有某勞工團體主張，新法涉及 多萬的外籍移工福祉，他們也應有參與公投的權利，不應被排除在外。該團體認為，任何勞基法的規定都是不分國籍直接衝擊所有的勞動者，雖然目前法律還不允許外籍人士參加公投，但可藉此項呼籲行動讓政府、社會大眾看見移工的意見，而且歐盟各國已有先例，允許非國籍人士擁有部分參政權。下列哪項說法最能詮釋上述勞工團體的主張？(A)各國應該不分國籍族群，讓人們享有相同的參政權以發展全球公民意識(B)我國政府對重要國際人權公約內容已經進行國內法制化，應當積極落實(C)公民投票具有直接民主和主權在民的實踐意義，全體住民皆有參與權利(D)權益受到新政策制訂影響的人們，均應能夠享有參與制訂該政策的權利', 'B', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(76, 5, 1, '有學生正在觀賞司法院的宣導短劇。劇中角色甲說：「庭上，本次我方所以代表國家起訴被告，是因為被告違反了刑事法律。」劇中角色乙立刻表示反對意見：「抗議！並沒有明確的證據足以證明我的當事人有罪。」假定角色不更換，學生繼續觀看下去將有可能會看到下面哪一個場景？(A)角色甲出現在行政法院中，負責審理行政法院之案件(B)角色甲在普通法院擔任國家委託民事訴訟案件代理人(C)角色乙接受法律扶助基金會委託，代理民事訴訟案件(D)角色乙在偵查庭中，指揮警察調查被告有無犯下罪刑', 'D', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(77, 5, 1, '我國《民法》對於子女姓氏應從父姓或母姓的規定，歷經數次修正，由原先「子女應從父姓」，改成可以由父母書面約定子女姓氏。但目前依據內政部調查顯示，絕大多數的子女仍以從父姓為主。下列哪一個論點最能用來說明此一現象？(A)法律未強制子女從父姓，係因社會習慣與法律具有一致性(B)因習慣法的效力優先於法律規定，故此現象合乎法律要求(C)社會大多數人重視家庭倫理，認為家庭是社會規範的基礎(D)社會傳統風俗習慣形塑了人們的行為，其影響比法律更強', 'D', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(78, 5, 1, '有關我國《民法》對結婚雙方的法定權利義務規定，下列敘述何者正確？(A)雙方同居時出生之小孩，結婚後自動視為婚生子女(B)依據法定夫妻財產制，夫妻全部財產皆為夫妻共有(C)婚姻期間出生之小孩為婚生子女，不可改變其身分(D)夫妻雙方取得對方遺產繼承權，離婚後也有繼承權', 'A', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(79, 5, 1, '在國外曾出現有宗教信徒因為違反宗教戒律，雖沒有違反明確法律規定，但仍被法院判處刑罰的案例。在我國，法院並不能因為信徒單純違反宗教戒律的行為而判其有罪，這是因為我國法院受到下列哪一項原則的拘束？(A)刑法謙抑(B)罪刑法定(C)程序正義(D)宗教自由', 'C,D', 2, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(80, 5, 1, '甲、乙、丙三國均加入世界貿易組織（WTO）之後，啟動的雙邊貿易協定如下:甲國先與乙國協商腳踏車關稅稅率為4%，後與丙國重新協商腳踏車關稅稅率為3%；於同一時間，乙國對丙國的腳踏車關稅降為2%，丙國對乙國的腳踏車關稅調整為5%。最後，甲國對於乙、丙兩國所訂定的腳踏車進口關稅稅率應為多少，方能符合WTO的關稅規範？(A) 2%(B) 3%(C) 4%(D) 5%', 'A,B', 2, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(81, 5, 2, '因為含糖飲料有增加民眾罹患肥胖、糖尿病及蛀牙的可能性，某國政府計畫對含糖飲料課徵「糖稅」，稅率隨飲料中含糖量增加而提高。此政策的手段與以下哪一個租稅政策最類似？(A)對年收入愈高的人徵收愈高的所得稅(B)對持有兩年內的豪宅交易課徵交易稅(C)排氣量愈高的汽車課徵愈高的燃料稅(D)對於酒精濃度高的烈酒課徵較高關稅', 'A', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(82, 5, 2, '若從自我與生活風格的關聯來看，下列何者最能詮釋劉致平與山區工人相處後的改變？(A)個人的文化品味較容易受到主流文化和生活風格的影響(B)封閉的農村社會組織，易造成自我和生活風格的侷限性(C)個人生命歷程對生活風格與身分意識的形成具有影響力(D)城鄉生活風格與教育程度差距，加深了彼此身分的區隔', 'D', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(83, 5, 2, '依據題文資訊，下列敘述何者最能說明「唱山歌」的文化意涵？(A)青年男女藉唱歌表達對自主情愛關係的嚮往(B)山歌風格標示出山區工人非主流的文化位階(C)工人藉由唱山歌以形塑勞動階層的群體文化(D)唱山歌是山區青年男女成年的社會通過儀式', 'D', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(84, 5, 2, '如果從「社會規範」的角度出發，下列敘述何者最適合用來解釋劉致平的「領悟」及其被迫遠走他鄉的情節？(A)階層界線太明確，妨礙地主與勞工之間發展出平等互惠的關係(B)傳統社會中的財產繼承，使得子女無法依自己的興趣選擇職業(C)血緣宗親力量若成為重大的人際壓力，將會限制個人自由發展(D)家庭為整體幸福並傳遞文化價值觀，常要求子女犧牲個人利益', 'B', 1, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(85, 5, 2, '在國外曾出現有宗教信徒因為違反宗教戒律，雖沒有違反明確法律規定，但仍被法院判處刑罰的案例。在我國，法院並不能因為信徒單純違反宗教戒律的行為而判其有罪，這是因為我國法院受到下列哪一項原則的拘束？(A)刑法謙抑(B)罪刑法定(C)程序正義(D)宗教自由', 'C,D', 2, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(86, 5, 2, '甲、乙、丙三國均加入世界貿易組織（WTO）之後，啟動的雙邊貿易協定如下:甲國先與乙國協商腳踏車關稅稅率為4%，後與丙國重新協商腳踏車關稅稅率為3%；於同一時間，乙國對丙國的腳踏車關稅降為2%，丙國對乙國的腳踏車關稅調整為5%。最後，甲國對於乙、丙兩國所訂定的腳踏車進口關稅稅率應為多少，方能符合WTO的關稅規範？(A) 2%(B) 3%(C) 4%(D) 5%', 'A,B', 2, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(87, 5, 2, '因為含糖飲料有增加民眾罹患肥胖、糖尿病及蛀牙的可能性，某國政府計畫對含糖飲料課徵「糖稅」，稅率隨飲料中含糖量增加而提高。此政策的手段與以下哪一個租稅政策最類似？(A)對年收入愈高的人徵收愈高的所得稅(B)對持有兩年內的豪宅交易課徵交易稅(C)排氣量愈高的汽車課徵愈高的燃料稅(D)對於酒精濃度高的烈酒課徵較高關稅', 'A,B', 2, 1, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(88, 5, 1, '假定有許多勞工團體對於《勞動基準法》的部分修正條文不滿，認為其損害勞工權益，進而發起公投要求廢除新修訂的相關條文；有某勞工團體主張，新法涉及 多萬的外籍移工福祉，他們也應有參與公投的權利，不應被排除在外。該團體認為，任何勞基法的規定都是不分國籍直接衝擊所有的勞動者，雖然目前法律還不允許外籍人士參加公投，但可藉此項呼籲行動讓政府、社會大眾看見移工的意見，而且歐盟各國已有先例，允許非國籍人士擁有部分參政權。下列哪項說法最能詮釋上述勞工團體的主張？(A)各國應該不分國籍族群，讓人們享有相同的參政權以發展全球公民意識(B)我國政府對重要國際人權公約內容已經進行國內法制化，應當積極落實(C)公民投票具有直接民主和主權在民的實踐意義，全體住民皆有參與權利(D)權益受到新政策制訂影響的人們，均應能夠享有參與制訂該政策的權利', 'B', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(89, 5, 1, '有學生正在觀賞司法院的宣導短劇。劇中角色甲說：「庭上，本次我方所以代表國家起訴被告，是因為被告違反了刑事法律。」劇中角色乙立刻表示反對意見：「抗議！並沒有明確的證據足以證明我的當事人有罪。」假定角色不更換，學生繼續觀看下去將有可能會看到下面哪一個場景？(A)角色甲出現在行政法院中，負責審理行政法院之案件(B)角色甲在普通法院擔任國家委託民事訴訟案件代理人(C)角色乙接受法律扶助基金會委託，代理民事訴訟案件(D)角色乙在偵查庭中，指揮警察調查被告有無犯下罪刑', 'D', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(90, 5, 1, '我國《民法》對於子女姓氏應從父姓或母姓的規定，歷經數次修正，由原先「子女應從父姓」，改成可以由父母書面約定子女姓氏。但目前依據內政部調查顯示，絕大多數的子女仍以從父姓為主。下列哪一個論點最能用來說明此一現象？(A)法律未強制子女從父姓，係因社會習慣與法律具有一致性(B)因習慣法的效力優先於法律規定，故此現象合乎法律要求(C)社會大多數人重視家庭倫理，認為家庭是社會規範的基礎(D)社會傳統風俗習慣形塑了人們的行為，其影響比法律更強', 'D', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(91, 5, 1, '有關我國《民法》對結婚雙方的法定權利義務規定，下列敘述何者正確？(A)雙方同居時出生之小孩，結婚後自動視為婚生子女(B)依據法定夫妻財產制，夫妻全部財產皆為夫妻共有(C)婚姻期間出生之小孩為婚生子女，不可改變其身分(D)夫妻雙方取得對方遺產繼承權，離婚後也有繼承權', 'A', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(92, 5, 1, '依據題文資訊，下列敘述何者最能說明「唱山歌」的文化意涵？(A)青年男女藉唱歌表達對自主情愛關係的嚮往(B)山歌風格標示出山區工人非主流的文化位階(C)工人藉由唱山歌以形塑勞動階層的群體文化(D)唱山歌是山區青年男女成年的社會通過儀式', 'B,D', 2, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(93, 5, 1, '如果從「社會規範」的角度出發，下列敘述何者最適合用來解釋劉致平的「領悟」及其被迫遠走他鄉的情節？(A)階層界線太明確，妨礙地主與勞工之間發展出平等互惠的關係(B)傳統社會中的財產繼承，使得子女無法依自己的興趣選擇職業(C)血緣宗親力量若成為重大的人際壓力，將會限制個人自由發展(D)家庭為整體幸福並傳遞文化價值觀，常要求子女犧牲個人利益', 'B,A', 2, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(94, 5, 2, '因為含糖飲料有增加民眾罹患肥胖、糖尿病及蛀牙的可能性，某國政府計畫對含糖飲料課徵「糖稅」，稅率隨飲料中含糖量增加而提高。此政策的手段與以下哪一個租稅政策最類似？(A)對年收入愈高的人徵收愈高的所得稅(B)對持有兩年內的豪宅交易課徵交易稅(C)排氣量愈高的汽車課徵愈高的燃料稅(D)對於酒精濃度高的烈酒課徵較高關稅', 'A', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(95, 5, 2, '若從自我與生活風格的關聯來看，下列何者最能詮釋劉致平與山區工人相處後的改變？(A)個人的文化品味較容易受到主流文化和生活風格的影響(B)封閉的農村社會組織，易造成自我和生活風格的侷限性(C)個人生命歷程對生活風格與身分意識的形成具有影響力(D)城鄉生活風格與教育程度差距，加深了彼此身分的區隔', 'D', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(96, 5, 2, '依據題文資訊，下列敘述何者最能說明「唱山歌」的文化意涵？(A)青年男女藉唱歌表達對自主情愛關係的嚮往(B)山歌風格標示出山區工人非主流的文化位階(C)工人藉由唱山歌以形塑勞動階層的群體文化(D)唱山歌是山區青年男女成年的社會通過儀式', 'D', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(97, 5, 2, '如果從「社會規範」的角度出發，下列敘述何者最適合用來解釋劉致平的「領悟」及其被迫遠走他鄉的情節？(A)階層界線太明確，妨礙地主與勞工之間發展出平等互惠的關係(B)傳統社會中的財產繼承，使得子女無法依自己的興趣選擇職業(C)血緣宗親力量若成為重大的人際壓力，將會限制個人自由發展(D)家庭為整體幸福並傳遞文化價值觀，常要求子女犧牲個人利益', 'B', 1, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(98, 5, 2, '我國《民法》對於子女姓氏應從父姓或母姓的規定，歷經數次修正，由原先「子女應從父姓」，改成可以由父母書面約定子女姓氏。但目前依據內政部調查顯示，絕大多數的子女仍以從父姓為主。下列哪一個論點最能用來說明此一現象？(A)法律未強制子女從父姓，係因社會習慣與法律具有一致性(B)因習慣法的效力優先於法律規定，故此現象合乎法律要求(C)社會大多數人重視家庭倫理，認為家庭是社會規範的基礎(D)社會傳統風俗習慣形塑了人們的行為，其影響比法律更強', 'B,D', 2, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(99, 5, 2, '有關我國《民法》對結婚雙方的法定權利義務規定，下列敘述何者正確？(A)雙方同居時出生之小孩，結婚後自動視為婚生子女(B)依據法定夫妻財產制，夫妻全部財產皆為夫妻共有(C)婚姻期間出生之小孩為婚生子女，不可改變其身分(D)夫妻雙方取得對方遺產繼承權，離婚後也有繼承權', 'A,C', 2, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(100, 5, 2, '在國外曾出現有宗教信徒因為違反宗教戒律，雖沒有違反明確法律規定，但仍被法院判處刑罰的案例。在我國，法院並不能因為信徒單純違反宗教戒律的行為而判其有罪，這是因為我國法院受到下列哪一項原則的拘束？(A)刑法謙抑(B)罪刑法定(C)程序正義(D)宗教自由', 'C,D', 2, 2, '2020-06-17 21:14:40', 'admin304', NULL, NULL),
(101, 1, 1, 'RRR', 'RRR', 1, 1, '2020-06-18 15:06:32', 'admin304', '2020-06-18 15:08:33', 'admin304');

-- --------------------------------------------------------

--
-- 資料表結構 `new_user`
--

CREATE TABLE `new_user` (
  `id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '帳號',
  `pwd` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密碼',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `tel` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '電話',
  `mail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'mail',
  `permission` int(11) NOT NULL DEFAULT 1 COMMENT '權限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 資料表結構 `subject`
--

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL COMMENT '科目ID',
  `subject_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '科目名稱'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `subject`
--

INSERT INTO `subject` (`subject_id`, `subject_name`) VALUES
(1, '國文'),
(2, '英文'),
(3, '數學'),
(4, '自然'),
(5, '社會');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '帳號',
  `pwd` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密碼',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '姓名',
  `tel` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '電話',
  `mail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'mail',
  `permission` int(11) NOT NULL COMMENT '權限',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `pwd`, `name`, `tel`, `mail`, `permission`, `token`) VALUES
('111', '$2y$12$F2nLtQYn6OB9Kq117.kRpeZqTMzG.jsjfW8tR6nK6JApElBfljZwK', '111', '0977777777', '111', 1, 'ce3otltuc1b5hkrogt8gd826hm'),
('1111', '$2y$12$V81V9ebjxaPdOj1JGnpkhOk894v/QuyCphKIwynbGAniFa0oKhnxm', '1111', '0900000000', '1111', 1, 'v20qtk2idru3hv8iiuiock8954'),
('admin304', '$2y$12$kGBaRNs4FY0ftMj/TkY2KuEr1O..5QYiQ7fI/cYXv68n4qEpdabgC', '江丞凱', '0912345678', '10863105@gm.nfu.edu.tw', 0, 'n4nikt74r37vr69p2olemhleg1'),
('admin304t', '$2y$12$H48MIlc1aMhyEo2BzAo6s.SflINIzjQpm/FXQ8xDWsg9vH/Zw3Lhe', 'test2', '0987654231', 'test2@gmail.com', 1, 'r2qufo3bupb9nbcgv6infferp0'),
('admin304u', '$2y$12$JC6Qq2AzsTPicEiH135e6./i02VxCZOnqsoLgkIjjk0wBsRYjwL3i', 'test1', '0923456789', 'test1@gmail.com', 1, 'ce3otltuc1b5hkrogt8gd826hm');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `exam_paper`
--
ALTER TABLE `exam_paper`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_paper_1` (`subject_id`);

--
-- 資料表索引 `exam_question`
--
ALTER TABLE `exam_question`
  ADD PRIMARY KEY (`question_number`),
  ADD KEY `exam_1` (`subject_id`);

--
-- 資料表索引 `new_user`
--
ALTER TABLE `new_user`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `exam_question`
--
ALTER TABLE `exam_question`
  MODIFY `question_number` int(11) NOT NULL AUTO_INCREMENT COMMENT '題號', AUTO_INCREMENT=102;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '科目ID', AUTO_INCREMENT=6;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `exam_paper`
--
ALTER TABLE `exam_paper`
  ADD CONSTRAINT `exam_paper_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 資料表的限制式 `exam_question`
--
ALTER TABLE `exam_question`
  ADD CONSTRAINT `exam_1` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
