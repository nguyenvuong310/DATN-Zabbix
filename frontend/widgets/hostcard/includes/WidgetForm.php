<?php declare(strict_types = 0);
/*
** Copyright (C) 2001-2024 Zabbix SIA
**
** This program is free software: you can redistribute it and/or modify it under the terms of
** the GNU Affero General Public License as published by the Free Software Foundation, version 3.
**
** This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
** without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
** See the GNU Affero General Public License for more details.
**
** You should have received a copy of the GNU Affero General Public License along with this program.
** If not, see <https://www.gnu.org/licenses/>.
**/


namespace Widgets\HostCard\Includes;

use Zabbix\Widgets\{
	CWidgetField,
	CWidgetForm
};

use Zabbix\Widgets\Fields\{CWidgetFieldCheckBox,
	CWidgetFieldMultiSelectHost,
	CWidgetFieldMultiSelectHostInventory,
	CWidgetFieldMultiSelectOverrideHost
};

/**
 * Host card widget form.
 */
class WidgetForm extends CWidgetForm {

	public function addFields(): self {
		return $this
			->addField($this->isTemplateDashboard()
				? null
				: (new CWidgetFieldMultiSelectHost('hostid', _('Host')))
					->setFlags(CWidgetField::FLAG_NOT_EMPTY | CWidgetField::FLAG_LABEL_ASTERISK)
					->setMultiple(false)
			)
			->addField(
				new CWidgetFieldCheckBox('show_suppressed', _('Show suppressed problems'))
			)
			->addField(
				new CWidgetFieldHostSections('sections', _('Show'))
			)
			->addField(
				new CWidgetFieldMultiSelectHostInventory('inventory', _('Inventory fields'))
			)
			->addField(
				new CWidgetFieldMultiSelectOverrideHost()
			);
	}
}
